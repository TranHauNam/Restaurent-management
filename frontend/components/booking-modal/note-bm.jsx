import React from 'react'
import { useState, useEffect } from 'react'
import { 
    View, Text, TextInput, TouchableOpacity, ScrollView
} from 'react-native'

import { styles } from '../../styles/booking-modal/note-bm'
import { Color } from '../../styles/GlobalStyles'

import Octicons from '@expo/vector-icons/Octicons';




export const NoteManager = ({note, setNote}) => {

    const [noteInput, setNoteInput] = useState("");

    const [noteChildren, setNoteChildren] = useState(false);
    const [noteBirthday, setNoteBirthday] = useState(false);
    const [noteWindowView, setNoteWindowView] = useState(false);
    const [quickNoteView, setQuickNoteView] = useState(true);

    //Toggle quick note
    const handleToggleQuickNote = (quickNote) => {
        switch (quickNote) {
            case "Children":
                setNoteChildren(!noteChildren);
                if (!noteChildren) {
                    handleAddQuickNote("Children");
                } else if (note.length > 0) {
                    setNote(note.filter(item => item !== "Children"));
                }
                break;
            case "Happy Birthday":
                setNoteBirthday(!noteBirthday);
                if (!noteBirthday) {
                    handleAddQuickNote("Happy Birthday");
                } else if (note.length > 0) {
                    setNote(note.filter(item => item !== "Happy Birthday"));
                }
                break;
            case "Window View":
                setNoteWindowView(!noteWindowView);
                if (!noteWindowView) {
                    handleAddQuickNote("Window View");
                } else if (note.length > 0) {
                    setNote(note.filter(item => item !== "Window View"));
                }
                break;
            default:
                break;
        }
    }

    //Auto Check and Open Quick Note View
    useEffect(() => {
        if (noteInput.length == 0 && quickNoteView == false) {
            setQuickNoteView(true);
            setNote([]);
            setNoteChildren(false);
            setNoteBirthday(false);
            setNoteWindowView(false);
        }
    }, [noteInput]);

    // Function to add quick note
    const handleAddQuickNote = (quickNote) => {
        if (!note.includes(quickNote)) {
            setNote([...note, quickNote]);
        }
    };

    // Function to add typed note
    const handleAddTypedNote = (text) => {
        setQuickNoteView(false);
        setNoteInput(text);
    }

    //show Notes
    const handleShowNotes = () => {
        if (quickNoteView == true) {
            if (note.length > 0) {
                return note.join(", ");
            } else {
                return "";
            }
        }
        else {            
            note.push(noteInput);
            return noteInput;
        }
    };

    return (
        <>
            {/* Note  */}
            {/* Type Note  */}
            <Text style={styles.labelText}>Note - Not Require</Text>
            <View style={styles.selectionContainer}>
                <View style={styles.longSelectorBox}>
                    <Octicons name="note" size={24} color="black" />                            
                    <TextInput 
                        style={styles.longSelectedText}
                        value={handleShowNotes()}
                        onChangeText={(text) => handleAddTypedNote(text)}
                        onFocus={() => setQuickNoteView(false)}
                    />
                </View>
            </View>

            {/* Quick Note  */}
            {quickNoteView && (
                <>                        
                    <ScrollView 
                        style={styles.quickSelectNoteView}
                        contentContainerStyle={styles.quickSelectNoteContainer}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <TouchableOpacity 
                            style={[
                                styles.quickSelectCard, 
                                noteChildren && { backgroundColor: Color.primary } 
                            ]}
                            onPress={() => handleToggleQuickNote("Children")}
                        >
                            <Text>Children</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[
                                styles.quickSelectCard,
                                noteBirthday && { backgroundColor: Color.primary }
                            ]}
                            onPress={() => handleToggleQuickNote("Happy Birthday")}
                        >
                            <Text>Happy Birthday</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[
                                styles.quickSelectCard,
                                noteWindowView && { backgroundColor: Color.primary }
                            ]}
                            onPress={() => handleToggleQuickNote("Window View")}
                        >
                            <Text>Window View</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </>
            )}
        </>
    )
}
