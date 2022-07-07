/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, PersistentVector, ContractPromiseBatch, storage } from 'near-sdk-as'

let posts = new PersistentVector<string>("posts");
let communities = new PersistentVector<string>("communities"); // respective to the posts.
let votes = new PersistentVector<i32>("votes"); // respective to the posts.
let accounts = new PersistentVector<string>("p"); // respective to the posts.
let voted = new PersistentVector<string[]>("voted"); // respective to the posts.
let communityList = new PersistentVector<string>("communityList"); // The list of individual communities that have been made.
let descriptionList = new PersistentVector<string>("descriptions");


export function getAllPosts(): string[] {
  let allPosts: string[] = [];
  for(let i = 0, k = posts.length; i < k; ++i) {
    allPosts.push(posts[i]);
  }
  return allPosts;
}

export function getAllVotes(): i32[] {
  let allVotes: i32[] = [];
  for(let i = 0, k = votes.length; i < k; ++i) {
    allVotes.push(votes[i]);
  }
  return allVotes;
}

export function getAllAccounts(): string[] {
  let allAccounts: string[] = [];
  for(let i = 0, k = accounts.length; i < k; ++i) {
    allAccounts.push(accounts[i]);
  }
  return allAccounts;
}

export function getAllVoters(): string[][] {
  let allvoters: string[][] = [];
  for(let i = 0, k = voted.length; i < k; ++i) {
    allvoters.push(voted[i]);
  }
  return allvoters;
}

export function getAllCommunities(): string[] {
  let allCommunities: string[] = [];
  for(let i = 0, k = communities.length; i < k; ++i) {
    allCommunities.push(communities[i]);
  }
  return allCommunities;
}

export function getCommunityList(): string[] {
  let list: string[] = [];
  for(let i = 0, k = communityList.length; i < k; ++i) {
    list.push(communityList[i]);
  }
  return list;
}

export function getDescriptions(): string[] {
  let list: string[] = [];
  for(let i = 0, k = descriptionList.length; i < k; ++i) {
    list.push(descriptionList[i]);
  }
  return list;
}

export function getPostCount(): u64 {
  const count = storage.getSome<u64>('postCount');
  return count;
}


export function makePost(post: string, community: string): void {
  assert(post != '', "Post cannot be an empty string.")
  posts.push(post);
  communities.push(community);
  votes.push(0);
  accounts.push(Context.sender)
  voted.push([])
  storage.set<u64>('postCount', posts.length)
}

export function createCommunity(name: string, description: string): void {
  assert(name != '', "Community name cannot be empty.")
  assert(description != '', "Community description cannot be empty.")
  communityList.push(name);
  descriptionList.push(description);
}

export function votePost(index: i32): bool {
  assert(posts.containsIndex(index), "Post of given index does not exist.");
  let premium = Context.attachedDeposit
  let voter = Context.sender;
  if (voted[index].includes(voter)) {
    ContractPromiseBatch.create(voter).transfer(premium)
    return false;
  } else {
    let currentVotes = votes[index];
    votes.replace(index, currentVotes+1);
    let tempArray = voted[index]
    tempArray.push(voter)
    voted.replace(index, tempArray)
    ContractPromiseBatch.create(accounts[index]).transfer(premium)
    return true;
  }
}

export function setCount(): void {
  storage.set<u64>('postCount', posts.length)
}

export function deleteVote(index: i32, voter: string): void {
  assert(posts.containsIndex(index), "Post of given index does not exist.");
  let currentVotes = votes[index]
  votes.replace(index, currentVotes-1);
  let tempArray = voted[index]
  logging.log(tempArray)
  tempArray.splice(tempArray.indexOf(voter), 1)
  logging.log(tempArray)
  voted.replace(index, tempArray)
}

export function clearAll(): void {
  for(let i = 0, k = posts.length; i < k; ++i){
    votes.pop()
    accounts.pop()
    posts.pop()
    voted.pop()
  }
}

export function clearLists(): void {
  for(let i = 0, k = communityList.length; i < k; ++i){
    descriptionList.pop()
    communityList.pop()
  }
}
