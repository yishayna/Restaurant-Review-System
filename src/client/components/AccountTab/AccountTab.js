import React, { Component } from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import CloseIcon from '@material-ui/icons/Close';
import PhotoIcon from '@material-ui/icons/Photo';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const styles = (theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2)
  },

  badge: {
    top: theme.spacing(2),
    right: -theme.spacing(2)
  },

  loadingBadge: {
    top: '50%',
    right: '50%'
  },

  avatar: {
    marginRight: 'auto',
    marginLeft: 'auto',

    width: theme.spacing(14),
    height: theme.spacing(14)
  },

  nameInitials: {
    cursor: 'default'
  },

  personIcon: {
    fontSize: theme.spacing(7)
  },

  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),

    minHeight: 'initial'
  }
});

const initialState = {
  profileCompletion: 0,
  securityRating: 0,
  showingField: '',
  avatar: null,
  avatarUrl: '',
  firstName: '',
  lastName: '',
  username: '',
  emailAddress: '',
  performingAction: false,
  loadingAvatar: false,
  sentVerificationEmail: false,
  errors: null
};

class AccountTab extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  getNameInitialsOrIcon = () => {
    const {
      user
    } = this.props;

    if (!user) {
      return null;
    }

    const {
      classes,
      userData
    } = this.props;

    if (!userData) {
      return <PersonIcon className={classes.personIcon} />;
    }

   
    return <PersonIcon className={classes.personIcon} />;
  };

  uploadAvatar = () => {
    const {
      avatar
    } = this.state;

    if (!avatar) {
      return;
    }

    this.setState({
      performingAction: true,
      loadingAvatar: true
    }, () => {
    changeAvatar(avatar).then((value) => {
        const {
          user,
          userData
        } = this.props;

        this.setState({
          profileCompletion: user.getProfileCompletion({ ...user, ...userData })
        }, () => {
          this.props.openSnackbar('Changed avatar');
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          default:
            this.props.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          performingAction: false,
          loadingAvatar: false,
          avatar: null,
          avatarUrl: ''
        });
      });
    });
  };

  removeAvatar = () => {
    const {
      user
    } = this.props;

    const {
      avatar,
      avatarUrl
    } = this.state;

   

    if (( avatar && avatarUrl) || ( avatar && avatarUrl)) {
      URL.revokeObjectURL(avatarUrl);

      this.setState({
        avatar: null,
        avatarUrl: ''
      }, () => {
        this.props.openSnackbar(`Removed image ???${avatar.name}???`, 5);
      });
    } else if ( !avatar && !avatarUrl) {
      this.setState({
        performingAction: true,
        loadingAvatar: true
      }, () => {
        removeAvatar().then((value) => {
          const {
            user,
            userData
          } = this.props;

          this.setState({
            profileCompletion: user.getProfileCompletion({ ...user, ...userData })
          }, () => {
            this.props.openSnackbar('Removed avatar');
          });
        }).catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            default:
              this.props.openSnackbar(message);
              return;
          }
        }).finally(() => {
          this.setState({
            performingAction: false,
            loadingAvatar: false
          });
        });
      });
    }
  };

  showField = (fieldId) => {
    if (!fieldId) {
      return;
    }

    this.setState({
      showingField: fieldId
    });
  };

  hideFields = (callback) => {
    this.setState({
      showingField: '',
      firstName: '',
      lastName: '',
      username: '',
      emailAddress: '',
      errors: null
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  changeFirstName = () => {
    const {
      firstName
    } = this.state;

   
    if (errors) {
      this.setState({
        errors: errors
      });

      return;
    }

    this.setState({
      errors: null
    }, () => {
      const {
        userData
      } = this.props;

      if (firstName === userData.firstName) {
        return;
      }

      this.setState({
        performingAction: true
      }, () => {
        changeFirstName(firstName).then(() => {
          const {
            user,
            userData
          } = this.props;

          this.setState({
            profileCompletion: user.getProfileCompletion({ ...user, ...userData })
          }, () => {
            this.hideFields(() => {
              this.props.openSnackbar('Changed first name');
            });
          });
        }).catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            default:
              this.props.openSnackbar(message);
              return;
          }
        }).finally(() => {
          this.setState({
            performingAction: false
          });
        });
      });
    });
  };

  changeLastName = () => {
    const {
      lastName
    } = this.state;

   


    this.setState({
      errors: null
    }, () => {
      const {
        userData
      } = this.props;

      if (lastName === userData.lastName) {
        return;
      }

      this.setState({
        performingAction: true
      }, () => {
        changeLastName(lastName).then(() => {
          const {
            user,
            userData
          } = this.props;

          this.setState({
            profileCompletion: user.getProfileCompletion({ ...user, ...userData })
          }, () => {
            this.hideFields(() => {
              this.props.openSnackbar('Changed last name');
            });
          });
        }).catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            default:
              this.props.openSnackbar(message);
              return;
          }
        }).finally(() => {
          this.setState({
            performingAction: false
          });
        });
      });
    });
  };

  changeUsername = () => {
    const {
      username
    } = this.state;


    

    this.setState({
      errors: null
    }, () => {
      const {
        userData
      } = this.props;

      if (username === userData.username) {
        return;
      }

      this.setState({
        performingAction: true
      }, () => {
        changeUsername(username).then(() => {
          const {
            user,
            userData
          } = this.props;

          this.setState({
            profileCompletion: user.getProfileCompletion({ ...user, ...userData })
          }, () => {
            this.hideFields(() => {
              this.props.openSnackbar('Changed username');
            });
          });
        }).catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            default:
              this.props.openSnackbar(message);
              return;
          }
        }).finally(() => {
          this.setState({
            performingAction: false
          });
        });
      });
    });
  };

  changeEmailAddress = () => {
    const {
      emailAddress
    } = this.state;

    

    if (errors) {
      this.setState({
        errors: errors
      });

      return;
    }

    this.setState({
      errors: null
    }, () => {
      const {
        user
      } = this.props;

      if (emailAddress === user.email) {
        return;
      }

      this.setState({
        performingAction: true
      }, () => {
        changeEmailAddress(emailAddress).then(() => {
          const {
            user,
            userData
          } = this.props;

          this.setState({
            profileCompletion: user.getProfileCompletion({ ...user, ...userData })
          }, () => {
            this.hideFields(() => {
              this.props.openSnackbar('Changed e-mail address');
            });
          });
        }).catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            default:
              this.props.openSnackbar(message);
              return;
          }
        }).finally(() => {
          this.setState({
            performingAction: false
          });
        });
      });
    });
  };

  verifyEmailAddress = () => {
    this.setState({
      performingAction: true
    }, () => {
      verifyEmailAddress().then(() => {
        this.setState({
          sentVerificationEmail: true
        }, () => {
          this.props.openSnackbar('Sent verification e-mail');
        });
      }).catch((reason) => {
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          default:
            this.props.openSnackbar(message);
            return;
        }
      }).finally(() => {
        this.setState({
          performingAction: false
        });
      });
    });
  };

  changeField = (fieldId) => {
    switch (fieldId) {
      case 'first-name':
        this.changeFirstName();
        return;

      case 'last-name':
        this.changeLastName();
        return;

      case 'username':
        this.changeUsername();
        return;

      case 'email-address':
        this.changeEmailAddress();
        return;

      default:
        return;
    }
  };

  handleKeyDown = (event, fieldId) => {
    if (!event || !fieldId) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const key = event.key;

    if (!key) {
      return;
    }

    if (key === 'Escape') {
      this.hideFields();
    } else if (key === 'Enter') {
      this.changeField(fieldId);
    }
  };

  handleAvatarChange = (event) => {
    if (!event) {
      return;
    }

    const files = event.target.files;

    if (!files) {
      return;
    }

    const avatar = files[0];

    if (!avatar) {
      return;
    }

    const fileTypes = [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml'
    ];

    if (!fileTypes.includes(avatar.type)) {
      return;
    }

    if (avatar.size > (20 * 1024 * 1024)) {
      return;
    }

    this.setState({
      avatar: avatar,
      avatarUrl: URL.createObjectURL(avatar)
    }, () => {
      this.props.openSnackbar(`Selected image ???${avatar.name}???`, 5);
    });
  };

  handleFirstNameChange = (event) => {
    if (!event) {
      return;
    }

    const firstName = event.target.value;

    this.setState({
      firstName: firstName
    });
  };

  handleLastNameChange = (event) => {
    if (!event) {
      return;
    }

    const lastName = event.target.value;

    this.setState({
      lastName: lastName
    });
  };

  handleUsernameChange = (event) => {
    if (!event) {
      return;
    }

    const username = event.target.value;

    this.setState({
      username: username
    });
  };

  handleEmailAddressChange = (event) => {
    if (!event) {
      return;
    }

    const emailAddress = event.target.value;

    this.setState({
      emailAddress: emailAddress
    });
  };

  render() {
    // Styling
    const {
      classes
    } = this.props;

    // Properties
    const {
      theme,
      user,
      userData
    } = this.props;

    // Events
    const {
      onDeleteAccountClick
    } = this.props;

    const {
      profileCompletion,
      securityRating,
      showingField,
      performingAction,
      loadingAvatar,
      avatar,
      avatarUrl,
      firstName,
      lastName,
      username,
      emailAddress,
      sentVerificationEmail,
      errors
    } = this.state;

    const hasFirstName = userData && userData.firstName;
    const hasLastName = userData && userData.lastName;
    const hasUsername = userData && userData.username;

    return (
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Box mb={2}>
          <Hidden xsDown>
            <Grid alignItems="center" container>
              <Grid item xs>
                <Box textAlign="center">
                  <Box mb={1.5}>
                    {(avatar && avatarUrl) &&
                      <Badge classes={{ badge: classes.badge }} badgeContent={
                        <Tooltip title="Remove">
                          <Fab classes={{ sizeSmall: classes.small }} color="secondary" disabled={performingAction} size="small" >
                            <CloseIcon fontSize="small" />
                          </Fab>
                        </Tooltip>
                      }>
                        {loadingAvatar &&
                          <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                            <Fade
                              style={{ transitionDelay: '1s' }}
                              in={loadingAvatar}
                              unmountOnExit>
                              <CircularProgress size={120} thickness={1.8} />
                            </Fade>
                          }>
                            <Avatar className={classes.avatar} alt="Avatar" src={avatarUrl} />
                          </Badge>
                        }

                        {!loadingAvatar &&
                          <Avatar className={classes.avatar} alt="Avatar" src={avatarUrl} />
                        }
                      </Badge>
                    }

                    {(!avatar && !avatarUrl) &&
                      <>
                        {
                          <Badge classes={{ badge: classes.badge }} badgeContent={
                            <Tooltip title="Remove">
                              <Fab classes={{ sizeSmall: classes.small }} color="secondary" disabled={performingAction} size="small" >
                                <CloseIcon fontSize="small" />
                              </Fab>
                            </Tooltip>
                          }>
                            {loadingAvatar &&
                              <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                                <Fade
                                  style={{ transitionDelay: '1s' }}
                                  in={loadingAvatar}
                                  unmountOnExit>
                                  <CircularProgress size={120} thickness={1.8} />
                                </Fade>
                              }>
                                <Avatar className={classes.avatar} alt="Avatar" src={} />
                              </Badge>
                            }

                            {!loadingAvatar &&
                              <Avatar className={classes.avatar} alt="Avatar" src={} />
                            }
                          </Badge>
                        }

                        {

                          <>
                            {loadingAvatar &&
                              <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                                <Fade
                                  style={{ transitionDelay: '1s' }}
                                  in={loadingAvatar}
                                  unmountOnExit>
                                  <CircularProgress size={120} thickness={1.8} />
                                </Fade>
                              }>
                                <Avatar className={classes.avatar} alt="Avatar">
                                  <Typography className={classes.nameInitials} variant="h2">
                                    {this.getNameInitialsOrIcon()}
                                  </Typography>
                                </Avatar>
                              </Badge>
                            }

                            {!loadingAvatar &&
                              <Avatar className={classes.avatar} alt="Avatar">
                                <Typography className={classes.nameInitials} variant="h2">
                                  {this.getNameInitialsOrIcon()}
                                </Typography>
                              </Avatar>
                            }
                          </>
                        }
                      </>
                    }
                  </Box>

                  {(avatar && avatarUrl) &&
                    <Button color="primary" disabled={performingAction} startIcon={<CloudUploadIcon />} variant="contained" >
                      Upload
                    </Button>
                  }

                  {(!avatar && !avatarUrl) &&
                    <>
                      <input
                        id="avatar-input"
                        type="file"
                        hidden
                        accept="image/*"

                        onChange={this.handleAvatarChange}
                      />

                      <label htmlFor="avatar-input">
                        <Button color="primary" component="span" disabled={performingAction} startIcon={<PhotoIcon />} variant="contained">
                          Choose...
                        </Button>
                      </label>
                    </>
                  }
                </Box>
              </Grid>

              <Grid item xs>
                <Box textAlign="center">
                  <Typography variant="body1">Profile completion</Typography>

                  {profileCompletion === 0 &&
                    <Typography color="error" variant="h5">{profileCompletion}%</Typography>
                  }

                  {profileCompletion === 100 &&
                    <Typography color="primary" variant="h5">{profileCompletion}%</Typography>
                  }

                  {(profileCompletion !== 0 && profileCompletion !== 100)  &&
                    <Typography color="secondary" variant="h5">{profileCompletion}%</Typography>
                  }
                </Box>
              </Grid>

              <Grid item xs>
                <Box textAlign="center">
                  <Typography variant="body1">Security rating</Typography>

                  {securityRating === 0 &&
                    <Typography color="error" variant="h5">{securityRating}%</Typography>
                  }

                  {securityRating === 100 &&
                    <Typography color="primary" variant="h5">{securityRating}%</Typography>
                  }

                  {(securityRating !== 0 && securityRating !== 100) &&
                    <Typography color="secondary" variant="h5">{securityRating}%</Typography>
                  }
                </Box>
              </Grid>
            </Grid>
          </Hidden>

          <Hidden smUp>
            <Box textAlign="center" mb={3}>
              <Box mb={1.5}>
                {(avatar && avatarUrl) &&
                  <Badge classes={{ badge: classes.badge }} badgeContent={
                    <Tooltip title="Remove">
                      <Fab classes={{ sizeSmall: classes.small }} color="secondary" disabled={performingAction} size="small" >
                        <CloseIcon fontSize="small" />
                      </Fab>
                    </Tooltip>
                  }>
                    {loadingAvatar &&
                      <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                        <Fade
                          style={{ transitionDelay: '1s' }}
                          in={loadingAvatar}
                          unmountOnExit>
                          <CircularProgress size={120} thickness={1.8} />
                        </Fade>
                      }>
                        <Avatar className={classes.avatar} alt="Avatar" src={avatarUrl} />
                      </Badge>
                    }

                    {!loadingAvatar &&
                      <Avatar className={classes.avatar} alt="Avatar" src={avatarUrl} />
                    }
                  </Badge>
                }

                {(!avatar && !avatarUrl) &&
                  <>
                    {
                      <Badge classes={{ badge: classes.badge }} badgeContent={
                        <Tooltip title="Remove">
                          <Fab classes={{ sizeSmall: classes.small }} color="secondary" disabled={performingAction} size="small">
                            <CloseIcon fontSize="small" />
                          </Fab>
                        </Tooltip>
                      }>
                        {loadingAvatar &&
                          <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                            <CircularProgress size={120} thickness={1.8} />
                          }>
                            <Avatar className={classes.avatar} alt="Avatar" src={} />
                          </Badge>
                        }

                        {!loadingAvatar &&
                          <Avatar className={classes.avatar} alt="Avatar" src={} />
                        }
                      </Badge>
                    }

                    {
                      <>
                        {loadingAvatar &&
                          <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                            <Fade
                              style={{ transitionDelay: '1s' }}
                              in={loadingAvatar}
                              unmountOnExit>
                              <CircularProgress size={120} thickness={1.8} />
                            </Fade>
                          }>
                            <Avatar className={classes.avatar} alt="Avatar">
                              <Typography className={classes.nameInitials} variant="h2">
                                {this.getNameInitialsOrIcon()}
                              </Typography>
                            </Avatar>
                          </Badge>
                        }

                        {!loadingAvatar &&
                          <Avatar className={classes.avatar} alt="Avatar">
                            <Typography className={classes.nameInitials} variant="h2">
                            </Typography>
                          </Avatar>
                        }
                      </>
                    }
                  </>
                }
              </Box>

              {(avatar && avatarUrl) &&
                <Button color="primary" disabled={performingAction} startIcon={<CloudUploadIcon />} variant="contained" >
                  Upload
                </Button>
              }

              {(!avatar && !avatarUrl) &&
                <>
                  <input
                    id="avatar-input"
                    type="file"
                    hidden
                    accept="image/*"

                    onChange={this.handleAvatarChange}
                  />

                  <label htmlFor="avatar-input">
                    <Button color="primary" component="span" disabled={performingAction} startIcon={<PhotoIcon />} variant="contained">
                      Choose...
                    </Button>
                  </label>
                </>
              }
            </Box>

            <Grid container>
              <Grid item xs>
                <Box textAlign="center">
                  <Typography variant="body1">Profile completion</Typography>

                  {profileCompletion === 0 &&
                    <Typography color="error" variant="h5">{profileCompletion}%</Typography>
                  }

                  {profileCompletion === 100 &&
                    <Typography color="primary" variant="h5">{profileCompletion}%</Typography>
                  }

                  {(profileCompletion !== 0 && profileCompletion !== 100)  &&
                    <Typography color="secondary" variant="h5">{profileCompletion}%</Typography>
                  }
                </Box>
              </Grid>

              <Grid item xs>
                <Box textAlign="center">
                  <Typography variant="body1">Security rating</Typography>

                  {securityRating === 0 &&
                    <Typography color="error" variant="h5">{securityRating}%</Typography>
                  }

                  {securityRating === 100 &&
                    <Typography color="primary" variant="h5">{securityRating}%</Typography>
                  }

                  {(securityRating !== 0 && securityRating !== 100) &&
                    <Typography color="secondary" variant="h5">{securityRating}%</Typography>
                  }
                </Box>
              </Grid>
            </Grid>
          </Hidden>
        </Box>

        <List dense={theme.dense} disablePadding>
          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
            </Hidden>

            {!hasFirstName &&
              <ListItemIcon>
                <Tooltip title="No first name">
                  <WarningIcon color="error" />
                </Tooltip>
              </ListItemIcon>
            }

            {showingField === 'first-name' &&
              <TextField
                autoComplete="given-name"
                autoFocus
                disabled={performingAction}
                error={!!(errors && errors.firstName)}
                fullWidth
                helperText={(errors && errors.firstName) ? errors.firstName[0] : 'Press Enter to change your first name'}
                label="First name"
                placeholder={hasFirstName && userData.firstName}
                required
                type="text"
                value={firstName}
                variant="filled"

                onBlur={this.hideFields}
                onKeyDown={(event) => this.handleKeyDown(event, 'first-name')}

                onChange={this.handleFirstNameChange}
              />
            }

            {showingField !== 'first-name' &&
              <>
                <ListItemText
                  primary="First name"
                  secondary={hasFirstName ? userData.firstName : 'You don???t have a first name'}
                />

                <ListItemSecondaryAction>
                  {hasFirstName &&
                    <Tooltip title="Change">
                      <div>
                        <IconButton disabled={performingAction} >
                          <EditIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  }

                  {!hasFirstName &&
                    <Button
                      color="primary"
                      disabled={performingAction}
                      variant="contained"
                     >
                      Add
                    </Button>
                  }
                </ListItemSecondaryAction>
              </>
            }
          </ListItem>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
            </Hidden>

            {!hasLastName &&
              <ListItemIcon>
                <Tooltip title="No last name">
                  <WarningIcon color="error" />
                </Tooltip>
              </ListItemIcon>
            }

            {showingField === 'last-name' &&
              <TextField
                autoComplete="family-name"
                autoFocus
                disabled={performingAction}
                error={!!(errors && errors.lastName)}
                fullWidth
                helperText={(errors && errors.lastName) ? errors.lastName[0] : 'Press Enter to change your last name'}
                label="Last name"
                placeholder={hasLastName && userData.lastName}
                required
                type="text"
                value={lastName}
                variant="filled"

                onBlur={this.hideFields}
                onKeyDown={(event) => this.handleKeyDown(event, 'last-name')}

                onChange={this.handleLastNameChange}
              />
            }

            {showingField !== 'last-name' &&
              <>
                <ListItemText
                  primary="Last name"
                  secondary={hasLastName ? userData.lastName : 'You don???t have a last name'}
                />

                <ListItemSecondaryAction>
                  {hasLastName &&
                    <Tooltip title="Change">
                      <div>
                        <IconButton disabled={performingAction}>
                          <EditIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  }

                  {!hasLastName &&
                    <Button
                      color="primary"
                      disabled={performingAction}
                      variant="contained"
                     >
                      Add
                    </Button>
                  }
                </ListItemSecondaryAction>
              </>
            }
          </ListItem>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
            </Hidden>

            {!hasUsername &&
              <ListItemIcon>
                <Tooltip title="No username">
                  <WarningIcon color="error" />
                </Tooltip>
              </ListItemIcon>
            }

            {showingField === 'username' &&
              <TextField
                autoComplete="username"
                autoFocus
                disabled={performingAction}
                error={!!(errors && errors.username)}
                fullWidth
                helperText={(errors && errors.username) ? errors.username[0] : 'Press Enter to change your username'}
                label="Username"
                placeholder={hasUsername && userData.username}
                required
                type="text"
                value={username}
                variant="filled"


              />
            }

            {showingField !== 'username' &&
              <>
                <ListItemText
                  primary="Username"
                  secondary={hasUsername ? userData.username : 'You don???t have a username'}
                />

                <ListItemSecondaryAction>
                  {hasUsername &&
                    <Tooltip title="Change">
                      <div>
                        <IconButton disabled={performingAction} >
                          <EditIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  }

                  {!hasUsername &&
                    <Button
                      color="primary"
                      disabled={performingAction}
                      variant="contained"
                    >
                      Add
                    </Button>
                  }
                </ListItemSecondaryAction>
              </>
            }
          </ListItem>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
            </Hidden>

            {user.email &&
              <ListItemIcon>
                <>
                  {user.emailVerified &&
                    <Tooltip title="Verified">
                      <CheckIcon color="primary" />
                    </Tooltip>
                  }

                  {!user.emailVerified &&
                    <Tooltip title="Not verified">
                      <WarningIcon color="error" />
                    </Tooltip>
                  }
                </>
              </ListItemIcon>
            }

            {!user.email &&
              <ListItemIcon>
                <Tooltip title="No e-mail address">
                  <WarningIcon color="error" />
                </Tooltip>
              </ListItemIcon>
            }

            {showingField === 'email-address' &&
              <TextField
                autoComplete="email"
                autoFocus
                disabled={performingAction}
                error={!!(errors && errors.emailAddress)}
                fullWidth
                helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : 'Press Enter to change your e-mail address'}
                label="E-mail address"
                placeholder={user.email}
                required
                type="email"
                value={emailAddress}
                variant="filled"

                onBlur={this.hideFields}
                onKeyDown={(event) => this.handleKeyDown(event, 'email-address')}

                onChange={this.handleEmailAddressChange}
              />
            }

            {showingField !== 'email-address' &&
              <>
                <ListItemText
                  primary="E-mail address"
                  secondary={user.email ? user.email : 'You don???t have an e-mail address'}
                />

                {(user.email && !user.emailVerified) &&
                  <Box clone mr={7}>
                    <ListItemSecondaryAction>
                      <Tooltip title="Verify">
                        <div>
                          <IconButton color="secondary" disabled={performingAction || sentVerificationEmail} >
                            <CheckIcon />
                          </IconButton>
                        </div>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </Box>
                }

                <ListItemSecondaryAction>
                  {user.email &&
                    <Tooltip title="Change">
                      <div>
                        <IconButton disabled={performingAction}>
                          <EditIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  }

                  {!user.email &&
                    <Button
                      color="primary"
                      disabled={performingAction}
                      variant="contained"
                     >
                      Add
                    </Button>
                  }
                </ListItemSecondaryAction>
              </>
            }
          </ListItem>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
            </Hidden>

            <Hidden xsDown>
              <ListItemText
                primary="Signed in"
                secondary={moment(user.metadata.lastSignInTime).format('LLLL')}
              />
            </Hidden>

            <Hidden smUp>
              <ListItemText
                primary="Signed in"
                secondary={moment(user.metadata.lastSignInTime).format('llll')}
              />
            </Hidden>
          </ListItem>

          <Box mt={1} mb={1}>
            <Divider light />
          </Box>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <DeleteForeverIcon />
              </ListItemIcon>
            </Hidden>

            <ListItemText
              primary="Delete account"
              secondary="Accounts can???t be recovered"
            />

            <ListItemSecondaryAction>
              <Button color="secondary" disabled={performingAction} variant="contained" >Delete</Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </DialogContent>
    );
  }

  componentDidMount() {
    const {
      user,
      userData
    } = this.props;

    this.setState({
      profileCompletion: user.getProfileCompletion({ ...user, ...userData }),
      securityRating: user.getSecurityRating(user, userData)
    });
  }

  componentWillUnmount() {
    const {
      avatarUrl
    } = this.state;

    if (avatarUrl) {
      URL.revokeObjectURL(avatarUrl);

      this.setState({
        avatarUrl: ''
      });
    }
  }
}

AccountTab.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Properties
  theme: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userData: PropTypes.object,

  // Functions
  openSnackbar: PropTypes.func.isRequired,

  // Events
  onDeleteAccountClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
   
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
   
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountTab));