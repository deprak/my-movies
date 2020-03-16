import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gql } from 'apollo-boost'
import {useQuery } from '@apollo/react-hooks'
import EntertainCard from '../components/EntertainCard'
import { FlatList } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { GET_TVS } from '../Graphql'
import Toast from 'react-native-tiny-toast'

function TVScreen() {
  const { loading, error, data, refetch } = useQuery(GET_TVS)

  useEffect(() => {
    if (loading && !error) {
      Toast.showLoading('Loading...')
    } else if (!loading && !error){
      Toast.hide()
    } else if (error){
      Toast.show(error)
    } else {
      Toast.hide()
    }
  }, [loading, error])

  function render() {
    if (loading) {
      return <Text></Text>
    }
    if (error) {
      return <Text></Text>
    }
    return ( 
      <LinearGradient
        colors={['pink', '#FBF4F9']}
        style={styles.screen}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* <Text>{JSON.stringify(data.tvs)}</Text> */}
        <FlatList
          data={data.tvs}
          renderItem={({ item }) => <EntertainCard entertainData={item} type="tv"/>}
          keyExtractor={item => item._id}
        />
      </LinearGradient>
    )
  }

  return render()
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ECECEC'
  }
})

export default TVScreen