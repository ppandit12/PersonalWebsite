# Comprehensive Troubleshooting Guide

This guide details resolutions for standard operational errors that can arise while managing a self-managed Kubernetes cluster on AWS.

---

## 1. Kubeadm Join Failures on Worker Nodes

### Symptom: Connection Timeout or Token Expired
During `ansible-playbook` execution or manual node addition, workers fail to join the cluster with errors like:
```
[discovery] Failed to request cluster-info, will try again: [dial tcp 10.0.1.50:6443: connect: connection timed out]
```
Or:
```
[join-config] Validation failed: token has expired or is invalid
```

### Resolutions:
1. **Security Group Filters**: Check if the **Master Security Group** is blocking ingress on port `6443` from the worker subnet. Ensure the VPC CIDR is fully allowed in the master inbound filters.
2. **Token Regeneration**: Kubeadm tokens expire after **24 hours**. If you are joining nodes later:
   - Log into the master node via SSH.
   - Generate a fresh token and print the join command:
     ```bash
     kubeadm token create --print-join-command
     ```
   - Copy this join command and run it with `sudo` on the worker nodes.
3. **Verify API Server IP**: Ensure the master node's internal private IP is correctly passed as the api server endpoint (the Ansible inventory hosts file handles this automatically).

---

## 2. Let's Encrypt / Cert-Manager Issuer Issues

### Symptom: Certificates Stuck in "Pending" or "False" State
Running `kubectl get certificate -n production-app` shows:
```
NAME           READY   SECRET         AGE
node-app-tls   False   node-app-tls   15m
```

### Resolutions:
1. **Inspect Cert-Manager Logs**: Identify why the ACME challenge is failing:
   ```bash
   kubectl logs -n cert-manager -l app.kubernetes.io/name=cert-manager -c cert-manager-controller --tail=100
   ```
2. **Describe Challenge Resource**: Cert-Manager creates temporary challenge resources to solve the `HTTP-01` path validation. Describe them to see the error details:
   ```bash
   kubectl get challenges -n production-app
   kubectl describe challenge <challenge-name> -n production-app
   ```
3. **Domain & Routing Validation**: Let's Encrypt must make an outbound request to `http://app.yourdomain.com/.well-known/acme-challenge/<TOKEN>`.
   - Ensure `app.yourdomain.com` is pointing to the public **Elastic IP** of your Master Node in your DNS provider (e.g. Route 53, Cloudflare).
   - Verify that port `80` is fully allowed inbound in your Master Security Group from all sources (`0.0.0.0/0`).
   - Check if Ingress controller is responding by running:
     ```bash
     curl -i http://app.yourdomain.com/
     ```

---

## 3. Container Network Interface (CNI) Pod CrashLoopBackOff

### Symptom: Calico or Flannel Pods fail to start
Pods remain in `ContainerCreating` or `CrashLoopBackOff` state. Checking `kubectl get pods -n kube-system` shows Calico/Tigera operator or network pods crashing.

### Resolutions:
1. **Swap Memory Check**: Ensure swap memory is completely disabled on Master and Worker nodes. Run `free -m` on each node. If swap is non-zero, run:
   ```bash
   sudo swapoff -a
   ```
   Disable it permanently in `/etc/fstab`.
2. **Bridge Netfilter Configuration**: Ensure the kernel module `br_netfilter` is active:
   ```bash
   sudo lsmod | grep br_netfilter
   ```
   If empty, load it manually and reload sysctl variables:
   ```bash
   sudo modprobe br_netfilter
   sudo sysctl --system
   ```
3. **Pod CIDR Conflict**: Ensure your Kubernetes cluster Pod CIDR (default Calico is `192.168.0.0/16`) does *not* overlap with the host VPC subnet ranges (`10.0.0.0/16`). An overlap causes immediate routing loops.

---

## 4. Docker Hub Image Pull Rate Limits

### Symptom: ErrImagePull or ImagePullBackOff
Pods fail to schedule with errors like:
```
Failed to pull image "docker.io/...": rpc error: code = Unknown desc = failed to pull and unpack image ... toomanyrequests: You have reached your pull rate limit
```

### Resolutions:
1. **Add Pull Secrets**: If using public Docker Hub, you are subject to rate limits. In production, configure an `imagePullSecret` on your deployment.
   - Create a Kubernetes secret containing your credentials:
     ```bash
     kubectl create secret docker-registry dockerhub-secret \
       --docker-server=https://index.docker.io/v1/ \
       --docker-username=YOUR_USERNAME \
       --docker-password=YOUR_PASSWORD \
       -n production-app
     ```
   - Reference it in `deployment.yaml` under `spec.template.spec`:
     ```yaml
     imagePullSecrets:
     - name: dockerhub-secret
     ```
2. **Use Alternative Registry**: Deploy using Amazon ECR (Elastic Container Registry) or GitHub Container Registry (ghcr.io), which do not enforce identical rate restrictions within public pipelines.

---

## 5. Useful Debugging Commands Quick-Reference

### Checking Cluster Health
```bash
# Check node statuses
kubectl get nodes -o wide

# Check system component statuses
kubectl get componentstatuses (or kubectl get pods -n kube-system)
```

### Troubleshooting Pod Outages
```bash
# Describe pod events to see scheduling errors or volume failures
kubectl describe pod <pod-name> -n production-app

# Inspect application stdout/stderr logs
kubectl logs <pod-name> -n production-app --tail=100

# Stream real-time logs from crashing pod
kubectl logs <pod-name> -n production-app -f
```

### Troubleshooting Host System Services
If `kubelet` fails to start on a worker node:
```bash
# Inspect kubelet service logs
sudo journalctl -u kubelet -n 100 --no-pager

# Restart container runtime and kubelet
sudo systemctl restart containerd
sudo systemctl restart kubelet
```
