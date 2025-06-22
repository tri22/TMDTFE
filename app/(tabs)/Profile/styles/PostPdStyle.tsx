// styles.js
import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sectionContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e384d',
        marginBottom: 8,
    },
    input: {
        borderWidth: 2,
        borderColor: '#2e384d',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#e5ebfc',
        fontSize: 16,
        color: '#2e384d',
    },
    inputLabel: {
        color: '#a6b3ac',
        fontSize: 14,
        marginBottom: 4,
        marginTop: 10,
    },
    dropdownContainer: {
        borderWidth: 2,
        borderColor: '#2e384d',
        borderRadius: 8,
        backgroundColor: '#e5ebfc',
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 30,
    },
    dropdownList: {
        backgroundColor: '#e5ebfc',
        borderWidth: 2,
        borderColor: '#2e384d',
        borderRadius: 8,
        marginTop: 4,
        maxHeight: 150,
    },
    dropdownItemText: {
        padding: 10,
        fontSize: 16,
        color: '#2e384d',
    },
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '48%',
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 16,
    },
});