#!/usr/bin/env bash
set -e

echo
echo 'About to call createCommunity() on the contract (creating test-community with test-description).'
echo near call \$CONTRACT createCommunity '{"name": \$1, "description": \$2}' --account_id \$ACCOUNT
echo
echo \$CONTRACT is $CONTRACT
echo \$ACCOUNT is $ACCOUNT
echo \$1 is $1
echo \$2 is $2
echo
json="'{\"name\": \"$1\", \"description\": \"$2\"}'"
echo $json
#near call $CONTRACT createCommunity $json --account_id $ACCOUNT
near call $CONTRACT createCommunity "$json" --account_id $ACCOUNT
#near call $CONTRACT createCommunity '{"name": "finance", "description": "finance description"}' --account_id $ACCOUNT
