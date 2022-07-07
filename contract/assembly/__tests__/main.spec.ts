import * as contract from '..'

const post = "The test post.";
const community = "TestCommunity";
const description = "Description for the test community."

describe('project', () => {

  beforeEach(() => {
    contract.createCommunity(community, description);
  })

  it('should be able to create and read communities and their descripitons', () => {
    const communities = contract.getCommunityList();
    const descriptions = contract.getDescriptions();
    const latestCommunity = communities[communities.length-1];
    const latestDescription = descriptions[descriptions.length-1];

    expect(latestCommunity).toBe(community);
    expect(latestDescription).toBe(description);
  })

  it('should be able to create and read posts', () => {
    contract.makePost(post, community);
    const posts = contract.getAllPosts();
    const latestPost = posts[posts.length-1];
    expect(latestPost).toBe(post);
  })

  it('should be able to vote posts, once per account.', () => {
    contract.makePost(post, community);

    const posts = contract.getAllPosts();
    let voteSuccess: bool = false;

    // first time: should succeed
    voteSuccess = contract.votePost(posts.length-1);
    expect(voteSuccess).toBe(true);

    // second time: should fail
    voteSuccess = contract.votePost(posts.length-1);
    expect(voteSuccess).toBe(false);
  })

})

