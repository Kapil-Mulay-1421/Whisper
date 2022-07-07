#!/usr/bin/env bash

set -e

echo
echo 'About to call makePost() on the CONTRACT'
echo near call \$CONTRACT makePost "{'post': \$1, 'community': \$2}" --account_id \$ACCOUNT
echo
echo \$CONTRACT is $CONTRACT
echo \$ACCOUNT is $ACCOUNT
echo \$1 is $1
echo \$2 is $2
echo
json="'{\"post\": \"$1\", \"community\": \"$2\"}'"

near call $CONTRACT makePost "$json" --account_id $ACCOUNT