# ==========================================================
# Remote State Configuration Template
# ==========================================================
# Instructions:
# 1. Create the S3 bucket and DynamoDB table before enabling this.
# 2. Uncomment the block below and replace the bucket, key, region, and dynamodb_table with your values.
# 3. Run 'terraform init' to migrate state.

# terraform {
#   backend "s3" {
#     bucket         = "your-company-terraform-state-bucket"
#     key            = "dev/k8s-cluster/terraform.tfstate"
#     region         = "us-east-1"
#     encrypt        = true
#     dynamodb_table = "terraform-lock-table"
#   }
# }
