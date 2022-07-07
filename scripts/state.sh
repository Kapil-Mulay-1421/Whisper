#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$ACCOUNT" ] && echo "Missing \$OWNER environment variable" && exit 1

echo "These are the environment variables being used:"
echo
echo "CONTRACT is [ $CONTRACT ]"
echo "USER is [ $USER ]"
echo
echo

echo "--------------------------------------------"
echo Contract Data
echo "--------------------------------------------"
# What are all the posts until now? -> post[]
echo "near view \$CONTRACT getAllPosts '{}'"
echo "These are all the posts until now:"
near view $CONTRACT getAllPosts '{}'
echo

# How many votes do these posts have -> votes[]
echo "near view \$CONTRACT getAllVotes '{}'"
echo "These are their respective UpVotes:"
near view $CONTRACT getAllVotes '{}'
echo

# Who has made these posts? -> accounts[]
echo "near view \$CONTRACT getAllAccounts '{}'"
echo "The accounts that made these posts:"
near view $CONTRACT getAllAccounts '{}'
echo

# What all communities exist? -> communities[]
echo "near view \$CONTRACT getCommunityList '{}'"
echo "These are all the communities created until now:"
near view $CONTRACT getCommunityList '{}'
echo
echo

