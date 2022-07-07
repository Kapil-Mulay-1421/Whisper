import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { login } from '../utils'
import * as nearAPI from "near-api-js";
import { transact } from '../transactions';
import Big from 'big.js';
const CommunityPage = () => {

    const safetyLimit = 1
    const [posts, setPosts]= useState([])
    const [communities, setCommunities] = useState([])
    const [votes, setVotes] = useState([])
    const [communityList, setList] = useState([])
    const [accounts, setAccounts] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [loaded, setLoaded] = useState(false);
    let count = 0; // Counts the number of posts for the community.

    let urlParams = new URLSearchParams(window.location.search);
    const communityName = urlParams.get('community');
    if (communityName == null) {
        window.location.href = '/'
    }

    useEffect(() => {
        const getPosts = async () => {
            let allPosts = await window.contract.getAllPosts();
            let allCommunities = await window.contract.getAllCommunities();
            let allVotes = await window.contract.getAllVotes();
            let allAccounts = await window.contract.getAllAccounts();
            let list = await window.contract.getCommunityList();

            setCommunities(allCommunities);
            setPosts(allPosts);
            setVotes(allVotes);
            setAccounts(allAccounts);
            setList(list);
            setLoaded(true);
        }

        getPosts();
    }, [disabled])

    const addVote = async (index) => {
        setDisabled(true)
        if(window.accontId === '') {
            login;
        } else {
            let donation = prompt("How much Near would you like to send to the maker of this post? Enter 0 if none.")
            if (typeof(donation*1) === 'number' && donation*1>=0 && donation*1<=safetyLimit) {
                try{
                    await window.contract.votePost({index: index}, Big(3).times(10 ** 13).toFixed(), Big(donation.toString() || '0').times(10 ** 24).toFixed()).then((voted) => {
                        if (!voted) {
                            alert("Looks like you've already voted. Your account has been refunded.")
                        } else {    
                            alert("Vote successful")
                        }
                    })
                } catch(err) {
                    alert("Couldn't add vote " + err);
                }
            } else {
                alert("Please enter an amount between 0 and 1.")
            }
        }
        setDisabled(false)
    }


  return (
    <div style={{display: "flex", justifyContent: "center"}}>
        <Container style={{minWidth: "40vw", marginTop: "5vw", backgroundColor: "rgb(41, 41, 41)", color: "white", minHeight: "50px", borderRadius: "20px", maxHeight: "480px", overflowY: "scroll"}}>
            { posts.slice().reverse().map((post, index) => {
                console.log(index)
                if(communities[communities.length - (index+1)].toLowerCase() == communityName.toLowerCase()) {
                    count += 1;
                    return (
                        <div key={index}>
                        <Row style={{margin: "20px", marginBottom: "0"}}>
                            <Col xs="auto" style={{backgroundColor: "white", color: "black",  padding: "15px", marginTop: "20px", borderRadius: "20px 20px 0px 0px"}}>
                            <h6 style={{margin: "0"}}>{accounts[accounts.length - (index+1)]}</h6>
                            </Col>
                        </Row>
                        <Row style={{margin: "20px", marginTop: "0", borderRadius: "0px", display: "flex", alignItems: "center"}}>
                            <Col md={8} style={{backgroundColor: "white", color: "black",  paddingLeft: "20px", paddingTop: "20px", borderRadius: "0px 20px 20px 20px"}}>
                                <p style={{margin: "20px", marginLeft: "0", padding: "20px", backgroundColor: "rgb(41, 41, 41)", color: "white", borderRadius: "20px"}}> {post} </p>
                            </Col>
                            <Col xs="auto" style={{marginLeft: "20px"}}>
                                <Button disabled={disabled} onClick={() => addVote(votes.length - (index+1))}>UpVote</Button>
                            </Col>
                            <Col xs="auto">
                                <div style={{backgroundColor: "white", color: "black",  width: "100px", padding: "10px", borderRadius: "10px"}}>
                                <p style={{marginBottom: "0"}}>Votes: {votes[votes.length - (index+1)]} </p>
                                </div>
                            </Col>
                        </Row>
                        </div>
                    )
                }
            })
            }
            {count === 0 && loaded ? <Row><p style={{margin: "10px"}}>No posts to show.</p></Row> : count === 0 ? <Row><p style={{margin: "10px"}}>Loading...</p></Row> : null}
            
        </Container>
    </div>
  )
}

export default CommunityPage