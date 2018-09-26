# Defines the CI script for Liane application
# The flow of the actual deploy work is defined in do_deployment function
# author: Boris Strandjev

# properties of the deployment
environment=$1
amazon_user="ec2-user"
remote_work_dir="/var/www/app"
local_assets_directory="dist/product-showcase"
remote_backup_dir="app_backup"


case $environment in
    production)
        amazon_host="18.185.118.232"
        private_key_path="/ssl/colibra_demo.pem"
        ;;
    *)
        echo "The first parameter must be the environment. Only 'production' is supported for the moment"
        exit
esac

execute_remotely() {
    instruction=$1
    result=$(ssh -o StrictHostKeyChecking=no $amazon_user@$amazon_host -i $private_key_path "cd ${remote_work_dir}; ${instruction}")
    echo $result
}

# Copies a local file to the remote working directory
# parameter 1 - the path to the source file to copy
# parameter 2 - the name to copy the file with. The file will always be copied in the remote work dir.
copy_file_to_remote_directory() {
   source_file_path=$1
   destination_file_name=$2
   scp -o StrictHostKeyChecking=no -i $private_key_path $source_file_path $amazon_user@$amazon_host:$remote_work_dir/$destination_file_name
}

# Copies a local directory to the remote working directory
# parameter 1 - the path to the source directory to copy
# parameter 2 - the name of target directory to use. The copying will always be in the remote work dir. Use '.' for the remote directory itself.
copy_dir_to_remote_directory() {
   source_directory_path=$1
   destination_directory_name=$2
   scp -r -o StrictHostKeyChecking=no -i $private_key_path $source_directory_path/. $amazon_user@$amazon_host:$remote_work_dir/$destination_directory_name
}

# Copies a file from the remote working directory locally
# parameter 1 - the name of the remote file to copy
copy_file_from_remote_directory() {
   remote_file_name=$1
   scp -o StrictHostKeyChecking=no -i $private_key_path $amazon_user@$amazon_host:$remote_work_dir/$remote_file_name $remote_file_name
}

do_deployment() {
   execute_remotely "sudo rm -r ../${remote_backup_dir}"
   execute_remotely "sudo cp -r . ../${remote_backup_dir}"
   execute_remotely "sudo rm -rf .* *"
   execute_remotely "sudo cp ../${remote_backup_dir}/.htaccess ."
   execute_remotely "sudo chown -R ec2-user ${remote_work_dir}"
   copy_dir_to_remote_directory $local_assets_directory '.'
   execute_remotely "sudo chown -R apache ${remote_work_dir}"
   execute_remotely "sudo chgrp -R apache ${remote_work_dir}"
   echo "Deployment successful. Previous version backed up"
}

# And here is the actual instruction
do_deployment
