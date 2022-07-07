#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"
[ -z "$ACCOUNT" ] && echo "Missing \$OWNER environment variable"

echo "deleting $CONTRACT"
echo
near delete $CONTRACT $ACCOUNT

echo --------------------------------------------
echo
echo "cleaning up the /neardev folder"
echo
rm -rf ./neardev

# exit on first error after this point to avoid redeploying with successful build
set -e

echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo
npm run build

echo --------------------------------------------
echo
echo "redeploying the contract"
echo
near dev-deploy ./contract/build/release/whisper.wasm

echo --------------------------------------------
echo run the following commands
echo
echo 'export CONTRACT=__new_contract_account_id__'
echo 'Enjoy Whisper!'
echo
echo

exit 0
