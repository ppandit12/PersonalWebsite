output "master_sg_id" {
  description = "The ID of the security group for K8s Master"
  value       = aws_security_group.master.id
}

output "worker_sg_id" {
  description = "The ID of the security group for K8s Workers"
  value       = aws_security_group.worker.id
}
