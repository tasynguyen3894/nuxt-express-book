#!/bin/bash

PEM=/User/admin/Downloads/tasy-first-instance-key.pem
HOST=ec2-user@ec2-18-138-107-209.ap-southeast-1.compute.amazonaws.com
COMMAND="bash /home/ec2-user/project/nuxt-express-book/deploy.sh"
ssh -i "$PEM" $HOST $COMMAND