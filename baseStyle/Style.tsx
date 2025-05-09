
export const colors = {
   blurPrimary: '#E5EBFC',
    primary: "#4472C4",
    black: '#000000',
    white: '#FFFFFF',
    dangerous: '#D71313',
    warning: '#F0DE36',
    success: "#4BB543",
    backgroundColor: '#F5EFE7',
    borderColor: "#0E2954",
    
   
  };

  
  export const buttonStyles = {
    button: {
      backgroundColor: colors.white,
      paddingVertical: 7,
      paddingHorizontal: 7,
      borderRadius: 6,
      alignItems: 'center' as const,
      margin: 10,
      alignSelf: 'flex-start' as const,
      borderWidth: 4,
      borderColor: colors.primary, 
    },
    blur: {
      borderColor: colors.blurPrimary, 
      color: colors.primary, 
    },
    text: {
      color: colors.primary, 
      fontSize: 16,
      fontWeight: 400,
    }

   
  };
  