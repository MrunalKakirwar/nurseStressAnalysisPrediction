from pyspark.sql import SparkSession
from pyspark.sql.functions import mean, col
from pyspark.sql import functions as F

S3_DATA_SOURCE_PATH = "s3://advancedbmrunu/data/raw/merged_data_4.csv"
S3_DATA_OUTPUT_PATH = "s3://advancedbmrunu/output3"

def main():
    spark = SparkSession.builder.appName('NurseDataAnalysis').getOrCreate()
    all_data = spark.read.csv(S3_DATA_SOURCE_PATH, header=True, inferSchema=True)
    line_chart_data = all_data.select("datetime","EDA", "HR", "TEMP")
    line_chart_data.write.format("csv").mode("overwrite").option("header", "true").save(f"{S3_DATA_OUTPUT_PATH}/chart_data")

    bar_chart_data = all_data.groupBy("label").agg(
        mean("X").alias("mean_X"),
        mean("Y").alias("mean_Y"),
        mean("Z").alias("mean_Z"),
        mean("EDA").alias("mean_EDA"),
        mean("HR").alias("mean_HR"),
        mean("TEMP").alias("mean_TEMP")
    )
    bar_chart_data.write.format("csv").mode("overwrite").option("header", "true").save(f"{S3_DATA_OUTPUT_PATH}/bar_chart_data")

    patient_mean_df = all_data.groupBy('id').agg(
    F.mean('EDA').alias('mean_EDA'),
    F.mean('HR').alias('mean_HR'),
    F.mean('TEMP').alias('mean_TEMP')
)
    patient_mean_df.write.format("csv").mode("overwrite").option("header", "true").save(f"{S3_DATA_OUTPUT_PATH}/patient_bar")

    
if __name__ == "__main__":
    main()
  