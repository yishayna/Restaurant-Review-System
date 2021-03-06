
 const useStyles = (theme => ({
  allclass:{
    backgroundImage: 'url(https://image.freepik.com/free-photo/close-up-blank-old-concrete-wall_23-2147856094.jpg)',
    backgroundSize: '100%',
    },
    paper: {
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(3),
    },
    submit: {
    margin: theme.spacing(3, 0, 2),
    },
    }));




export  {useStyles};