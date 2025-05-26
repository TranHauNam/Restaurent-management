import React from 'react'
import { 
    View, Text, TextInput, TouchableOpacity, ScrollView
} from 'react-native'

import { styles } from '../../styles/booking-modal/note-bm'
import { Color } from '../../styles/GlobalStyles'



export const NoteManager = () => {


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
