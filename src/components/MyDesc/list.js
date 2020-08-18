import React, { useRef } from 'react';
import { View, Animated, PanResponder } from 'react-native';

const list = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
      },
    }),
  ).current;
  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }],
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.list}
          onPress={() =>
            props.navigation.navigate('Cards', {
              listId: item.id,
              listTitle: item.title,
            })
          }
        >
          <View style={styles.containerListTitle}>
            <Text style={styles.listTitle}>{item.title}</Text>
          </View>

          {/* <TouchableOpacity
  style={styles.button}
  onPress={() => props.removeListThunk(item.id, props.state.authorReducer.token)}
>
  <Text>Delete</Text>
</TouchableOpacity>
<ModalWindow style={styles.delete} handlePut={handlePutList} item={item} /> */}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default list;
