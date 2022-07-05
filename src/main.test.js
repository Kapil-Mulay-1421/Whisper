beforeAll(async function () {
  // NOTE: nearlib and nearConfig are made available by near-cli/test_environment
  const near = await nearlib.connect(nearConfig)
  window.accountId = nearConfig.contractName
  window.contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ['getCommunityList'],
    changeMethods: ['createCommunity'],
    sender: window.accountId
  })

  window.walletConnection = {
    requestSignIn() {
    },
    signOut() {
    },
    isSignedIn() {
      return true
    },
    getAccountId() {
      return window.accountId
    }
  }
})

test('getCommunity', async () => {
  await window.contract.createCommunity({args: {name: "TestCommunity", description: "Test Description."}})
  const communities = await window.contract.getCommunityList()
  expect(communities[0]).toBe('TestCommunity')
})
