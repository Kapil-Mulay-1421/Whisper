## Usage

1. Head over to your console.
2. Set these environment variables: 
    ```sh
    export CONTRACT= # depends on deployment
    export ACCOUNT= # any account you own
    ```
3. Start by initializing the contract. In the main directory, enter: 
    ```sh
    ./scripts/init.sh
    ```
4. Create a Community. In the main directory, enter: 
    ```sh
    ./scripts/create-community.sh "your_community_name" "your_community_description"
    ```
5. Try posting something. In the main directory, enter: 
    ```sh
    ./scripts/post.sh "your_post" "community_to_post_to"
    ```
6. You can also upvote posts. Users have the option to attach a little money alongside the upvote, which goes directly to the creator of that post. In the main directory, enter: 
    ```sh
    ./scripts/vote.sh index_of_post money_to_attach
    ```
7. To view all the posts, communities and other details of the network, in the main directory, enter: 
    ```sh
    ./scripts/state.sh
    ```
* You can do all this, and still retain your privacy on this decentralized networking platform.