import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TextInput,
  Input,
  View,
  Button,
  TouchableHighlight,
  Text,
} from 'react-native';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function submitNote(event) {
    props.onAdd(title);
    props.onAdd(content);
    event.preventDefault();
    console.log(title);
    console.log(content);
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <View>
      <View>
        {isExpanded && (
          <TextInput
            name="title"
            placeholder="Title"
            onChangeText={title => setTitle(title)}
            defaultValue={title}
          />
        )}
        <TextInput
          name="content"
          onPressIn={expand}
          onChangeText={content => setContent(content)}
          defaultValue={content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <MaterialCommunityIcons in={isExpanded}>
          <Button title="Add" onPress={submitNote} />
        </MaterialCommunityIcons>
      </View>
    </View>
  );
}

export default CreateArea;
