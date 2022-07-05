import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { login } from '../utils'

const NewPost = () => {
  const post = useRef('')
  const community = useRef('')
  const [disabled, setDisabled] = useState(false)
  const [communityList, setList] = useState([])

  useEffect(async () => {
    let list = await window.contract.getCommunityList();
    setList(list);
  }, [])

  function inList(list, element) {
    let isInList = false;
    list.forEach(item => {
      if(item.toLowerCase() == element.toLowerCase()) {
        isInList =  true;
      }
    })
    return isInList;
  }

  const makePost = async (e) => {
    e.preventDefault();
    if(window.accontId === '') {
      login;
    } else {
      if (post.current.value == '' || community.current.value == '') {
        alert('Please type in your post and community.')
      } else {
        if (! inList(communityList, community.current.value)) {
          alert("The community you typed in doesn't exist. Care to create one?")
          return;
        }
        setDisabled(true)
        try {
          await window.contract.makePost({post: post.current.value, community: community.current.value.toLowerCase()})
          window.location.replace('/')
        } catch(err) {
          alert("Problem sending post to the blockchain. " + err)
        }
        setDisabled(false)
      }
    }
  }

  return (
    <div style={{backgroundColor: "rgb(41, 41, 41)", color: "white", borderRadius: "20px", width: "50vw", padding: "20px", marginTop: "50px", marginLeft: "25vw"}}>
      <h3>Make a new Post</h3>
      <Form onSubmit={() => makePost(event)} style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px"}}>
        <Form.Group className='mb-3' style={{minWidth: "100%"}}>
          <Form.Control as="textarea" rows={5}
            ref={post}
            placeholder='Type in your new post'
            >
          </Form.Control>
          <Form.Control
            ref={community}
            placeholder='Post to this community'
            style={{marginTop: "30px"}}
            >
          </Form.Control>
        </Form.Group>
        <Button type='submit' disabled={disabled}>{disabled ? "Posting..." : "Post"}</Button>
      </Form>
    </div>
  )
}

export default NewPost