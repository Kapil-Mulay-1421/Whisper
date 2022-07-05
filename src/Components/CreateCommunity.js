import { Form, Button } from 'react-bootstrap'
import { login } from '../utils'
import React, { useState, useRef, useEffect } from 'react'


const CreateCommunity = () => {

    const name = useRef('')
    const description = useRef('')
    const [disabled, setDisabled] = useState(false)
    const [communityList, setList] = useState([])

    useEffect(async () => {
        let list = await window.contract.getCommunityList();
        setList(list);
      }, [])

      function inList(list, element) {
        let isInList = false;
        list.map(item => {
          if(item.toLowerCase() == element.toLowerCase()) {
            isInList = true;
          }
        })
        return isInList;
      }

    const makeCommunity = async (e) => {
        e.preventDefault();
        if(window.accontId === '') {
            login;
        }
        if (inList(communityList, name.current.value)) {
            alert("The community you typed in already exists. Check it out!")
            return;
        }
        if (name.current.value == '' || description.current.value == '') {
            alert('Please type in your community name and description.')
            return;
        }
        setDisabled(true)
        try {
          let communityName = name.current.value;
            await window.contract.createCommunity({name: communityName, description: description.current.value})
            window.location.href = "/"
        } catch(err) {
          alert("Problem sending data to the blockchain. " + err)
        }
        setDisabled(false)
    }

  return (
    <div style={{backgroundColor: "rgb(41, 41, 41)", color: "white", borderRadius: "20px", width: "50vw", padding: "20px", marginTop: "50px", marginLeft: "25vw"}}>
    <h3>Create a new Community</h3>
    <Form onSubmit={() => makeCommunity(event)} style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px"}}>
    <Form.Group className='mb-3' style={{minWidth: "100%"}}>
      <Form.Control
        ref={name}
        placeholder='Community name'
        >
      </Form.Control>
      <Form.Control as="textarea" rows={5}
        ref={description}
        placeholder='Write a description...'
        style={{marginTop: "30px"}}
        >
      </Form.Control>
    </Form.Group>
    <Button type='submit' disabled={disabled}>{disabled ? "Creating..." : "Create"}</Button>
  </Form>
  </div>
  )
}

export default CreateCommunity