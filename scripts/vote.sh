#!/usr/bin/env bash

set -e

echo
echo 'About to call votePost() on the CONTRACT'
echo near call \$CONTRACT votePost "{ 'index': \$1 }" --account_id \$ACCOUNT --deposit \$2
echo
echo \$CONTRACT is $CONTRACT
echo \$ACCOUNT is $ACCOUNT
echo \$1 is $1
echo \$2 is $2
echo
json="'{\"index\": $1}'"
near call $CONTRACT votePost "$json" --account_id $ACCOUNT --deposit $2