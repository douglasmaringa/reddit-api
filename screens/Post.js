import { View, Text ,Image,ScrollView} from 'react-native'
import React,{useEffect,useState} from 'react'

const Post = ({route}) => {
  const { url,name,date } = route.params;

  const [data,setData]=useState([])
  const[load,setLoad]=useState(false)

  useEffect(() => {
    getPostsFromApi();
  }, [])

  const getPostsFromApi = () => {
      setLoad(true)
      return fetch(`${url}.json`)
        .then((response) => response.json())
        .then((json) => {
          setData(json)
          setLoad(false)
          return;
        })
        .catch((error) => {
          console.error(error);
          setLoad(false)
        });
    };
  
  //console.log(data)

  //console.log(url)
  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <Text style={{fontSize:20,fontWeight:"light"}}>Posted by {name} at {date}</Text>
     
      {
        data.map((e)=>(
          <>
          {
            e.data.children.map((f)=>(
              <View key={f.data.title}>
              {/*images showing forbiden error when trying to display*/}
              {/*<Image source={{uri:f.data.preview?.images[0]?.source?.url}} width={100} height={100}/>*/}
              <ScrollView>
              <Text style={{fontSize:20,fontWeight:"light"}}>{f.data.selftext}</Text>
             
              <Text style={{fontSize:20,fontWeight:"light",marginBottom:20}}>Comments</Text>
             
              <Text style={{color:"black",fontSize:20,fontWeight:"light",marginBottom:20}}> {f.data.body}</Text>
              
              </ScrollView>
              </View>
            ))
          }
     
          </>
        ))
      }
    </View>
  )
}

export default Post