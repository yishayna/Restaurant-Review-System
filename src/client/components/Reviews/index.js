
 const useStyles = (theme => ({
    allclass:{
      backgroundImage: 'url(https://image.freepik.com/free-photo/close-up-blank-old-concrete-wall_23-2147856094.jpg)',
      backgroundSize: '100%',
      },
      paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
      },
      avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      },
      form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      },
      submit: {
      margin: theme.spacing(3, 0, 2),
      },

    button: {
      display: 'block',
      marginTop: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
  }));
  
  
  export  {useStyles};