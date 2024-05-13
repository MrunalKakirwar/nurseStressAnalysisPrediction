from pyspark.sql import SparkSession
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.regression import RandomForestRegressor
from pyspark.ml import Pipeline
from pyspark.ml.evaluation import RegressionEvaluator
import pyspark.sql.functions as func
from pyspark.sql.functions import when, count, lit

S3_DATA_SOURCE_PATH = "s3://advancedbmrunu/data/raw/merged_data_4.csv"
S3_DATA_OUTPUT_PATH = "s3://advancedbmrunu/output_model"

spark = SparkSession.builder.appName("NurseDataAnalysis").getOrCreate()

nurse_data = spark.read.csv(S3_DATA_SOURCE_PATH, header=True, inferSchema=True)

features = nurse_data.select("X", "Y", "Z", "EDA", "HR", "TEMP")
label = nurse_data.select("label")

assembler = VectorAssembler(inputCols=features.columns, outputCol="features")

rf = RandomForestRegressor(featuresCol="features", labelCol="label", numTrees=100)
pipeline = Pipeline(stages=[assembler, rf])

(train_data, test_data) = nurse_data.randomSplit([0.7, 0.3], seed=42)

model = pipeline.fit(train_data)

predictions = model.transform(test_data)
preds = predictions.withColumn("prediction", func.round(predictions["prediction"]).cast('integer'))

evaluator = RegressionEvaluator(labelCol="label", predictionCol="prediction", metricName="rmse")
rmse = evaluator.evaluate(predictions)
print(f"Root Mean Squared Error (RMSE): {rmse}")

r2_evaluator = RegressionEvaluator(labelCol="label", predictionCol="prediction", metricName="r2")
r2 = r2_evaluator.evaluate(predictions)
print(f"R-squared (R²): {r2}")

print("Predictions:")
preds  = preds.select("label", "prediction")
preds.select("label", "prediction").show()

preds.write.format("csv").mode("overwrite").option("header", "true").save("s3://advancedbmrunu/output_model/preds")

print("Training Data:")
train_data.show()

print("Test Data:")
test_data.show()

model_path = "s3://advancedbmrunu/output_model/savedmodel"
model.write().overwrite().save(model_path)

train_data.write.format("csv").mode("overwrite").option("header", "true").save("s3://advancedbmrunu/output_model/train_data")
test_data.write.format("csv").mode("overwrite").option("header", "true").save("s3://advancedbmrunu/output_model/test_data")