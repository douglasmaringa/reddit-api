import { View, Text, ScrollView,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'


const Home = ({navigation}) => {
    const [data,setData]=useState([])
    const[load,setLoad]=useState(false)

    useEffect(() => {
      getPostsFromApi();
    }, [])

    const getPostsFromApi = () => {
        setLoad(true)
        return fetch('https://www.reddit.com/r/reactnative.json')
          .then((response) => response.json())
          .then((json) => {
            setData(json.data.children)
            setLoad(false)
            return;
          })
          .catch((error) => {
            console.error(error);
            setLoad(false)
          });
      };
    
    //console.log(data.children)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <ScrollView>
      <View>
      {
        load?(<>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'flex-start'}}>
      <Text style={{fontSize:26,fontWeight:"700",color:"white",backgroundColor:"gray",marginHorizontal:5,paddingHorizontal:2}}>Loading</Text>
    </View>
        </>):(<>
          {
        data?.map((e)=>(
        <View key={e.data.title}>
        <TouchableOpacity  onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Post', {
            url: e.data.url,
            name:e.data?.author_fullname,
            date:new Date(e.data?.created_utc).toString()
          });
        }}
        style={{padding:10}}
        >
          <Text style={{fontSize:20,fontWeight:"light"}}>Posted by {e.data?.author_fullname} at {new Date(e.data?.created_utc).toString()}</Text>
       
          <Text style={{fontSize:20,fontWeight:"semi-bold"}}>{e.data?.title}</Text>
          
        </TouchableOpacity>
        <View  style={{padding:10}}>
       <Text>{e.data?.selftext}</Text>
       </View>
        </View>
      
        )
         
        )
      }
        </>)
      }
      
    
    </View>
     </ScrollView>
    </View>
  )
}

export default Home