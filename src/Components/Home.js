import React, {useState, useEffect} from 'react'

const Home = () => {
    const [communityList, setList] = useState([])
    const [descriptionList, setDescriptions] = useState([])
    const [postCount, setPostCount] = useState(0);

    useEffect(async () => {
      let list = await window.contract.getCommunityList();
      setList(list);
      let descriptions = await window.contract.getDescriptions();
      setDescriptions(descriptions);
      let totalPosts = await window.contract.getPostCount();
      setPostCount(totalPosts);
    }, [])

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1 style={{margin: "50px", userSelect: "none"}}>Get Engaged in a Community</h1>
      <h4>Total Posts: {postCount}</h4>
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", columnGap: "30px", rowGap: "30px"}}>
    {communityList.map((community, index) => {
        return(
            <div key={index} style={{backgroundColor: "rgb(41, 41, 41)", color: "white", minHeight: "50px", maxHeight: "300px", maxWidth: "300px", padding: "30px", borderRadius: "20px", cursor: "pointer"}} onClick={() => window.location.href="CommunityPage?community=" + community}>
                <h4 style={{userSelect: "none"}}>{community}</h4>
                <p>{descriptionList[index]}</p>
            </div>
        )
    })}
    </div>
    </div>
  )
}

export default Home