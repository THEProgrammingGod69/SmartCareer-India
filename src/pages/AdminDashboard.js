import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Person,
  Delete,
  Edit,
  Add,
  Star,
  StarBorder,
  AdminPanelSettings,
  Security,
  SupervisorAccount,
  Search,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const AdminDashboard = () => {
  const { currentUser, userRoles, grantPremiumByEmail } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [grantPremiumDialogOpen, setGrantPremiumDialogOpen] = useState(false);
  const [premiumDuration, setPremiumDuration] = useState(12); // Default 12 months
  const [grantAdminDialogOpen, setGrantAdminDialogOpen] = useState(false);
  const [grantPremiumByEmailDialogOpen, setGrantPremiumByEmailDialogOpen] = useState(false);
  const [premiumEmail, setPremiumEmail] = useState('');

  // Check if user has admin privileges
  useEffect(() => {
    if (!userRoles.isAdmin) {
      // Redirect non-admin users
      navigate('/dashboard');
      return;
    }

    fetchUsers();
  }, [userRoles.isAdmin, navigate]);

  // Fetch users from Firestore
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'Unknown',
        });
      });
      
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setNotification({
        open: true,
        message: 'Failed to load users',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (user.email && user.email.toLowerCase().includes(searchLower)) ||
      (user.displayName && user.displayName.toLowerCase().includes(searchLower))
    );
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Toggle premium status
  const togglePremiumStatus = async (userId, currentStatus) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      if (currentStatus) {
        // Removing premium status
        await updateDoc(userRef, {
          isPremium: false,
          subscription: null,
        });
      } else {
        // Open dialog to grant premium with duration
        setSelectedUser(userId);
        setGrantPremiumDialogOpen(true);
        return;
      }
      
      // Update local state
      setUsers(users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isPremium: !currentStatus,
            subscription: !currentStatus ? {
              status: 'active',
              plan: 'admin_granted',
            } : null,
          };
        }
        return user;
      }));
      
      setNotification({
        open: true,
        message: `Premium status ${currentStatus ? 'removed' : 'granted'}`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating premium status:', error);
      setNotification({
        open: true,
        message: 'Failed to update premium status',
        severity: 'error',
      });
    }
  };

  // Grant premium access with duration
  const handleGrantPremium = async () => {
    if (!selectedUser) return;
    
    try {
      const userRef = doc(db, 'users', selectedUser);
      
      // Calculate expiration date
      const now = new Date();
      const expirationDate = new Date(now.setMonth(now.getMonth() + premiumDuration));
      
      await updateDoc(userRef, {
        isPremium: true,
        subscription: {
          status: 'active',
          plan: 'admin_granted',
          current_period_end: expirationDate,
          cancel_at_period_end: true,
        },
      });
      
      // Update local state
      setUsers(users.map(user => {
        if (user.id === selectedUser) {
          return {
            ...user,
            isPremium: true,
            subscription: {
              status: 'active',
              plan: 'admin_granted',
              current_period_end: expirationDate.toLocaleDateString(),
            },
          };
        }
        return user;
      }));
      
      setNotification({
        open: true,
        message: `Premium access granted for ${premiumDuration} months`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Error granting premium access:', error);
      setNotification({
        open: true,
        message: 'Failed to grant premium access',
        severity: 'error',
      });
    } finally {
      setGrantPremiumDialogOpen(false);
      setSelectedUser(null);
    }
  };

  // Toggle admin status
  const toggleAdminStatus = async (userId, currentStatus) => {
    if (currentStatus) {
      // Confirm before removing admin status
      setSelectedUser(userId);
      setDialogOpen(true);
      return;
    } else {
      // Confirm before granting admin status
      setSelectedUser(userId);
      setGrantAdminDialogOpen(true);
      return;
    }
  };

  // Handle admin status change confirmation
  const handleConfirmAdminChange = async (grant) => {
    if (!selectedUser) return;
    
    try {
      const userRef = doc(db, 'users', selectedUser);
      
      await updateDoc(userRef, {
        isAdmin: grant,
      });
      
      // Update local state
      setUsers(users.map(user => {
        if (user.id === selectedUser) {
          return {
            ...user,
            isAdmin: grant,
          };
        }
        return user;
      }));
      
      setNotification({
        open: true,
        message: `Admin privileges ${grant ? 'granted' : 'removed'}`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating admin status:', error);
      setNotification({
        open: true,
        message: 'Failed to update admin status',
        severity: 'error',
      });
    } finally {
      setDialogOpen(false);
      setGrantAdminDialogOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AdminPanelSettings color="primary" sx={{ mr: 1 }} />
          <Typography variant="h4" component="h1">
            Admin Dashboard
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage users, premium subscriptions, and site content.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Grant Premium Access by Email
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EmailIcon />}
                onClick={() => setGrantPremiumByEmailDialogOpen(true)}
              >
                Add Premium User
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Quickly grant premium access to users by their email address, even if they haven't registered yet.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                label="Search Users"
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mr: 2 }}
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={fetchUsers}
              >
                Refresh
              </Button>
            </Box>

            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="All Users" />
              <Tab label="Premium Users" />
              <Tab label="Admins" />
            </Tabs>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {filteredUsers
                  .filter(user => {
                    if (activeTab === 1) return user.isPremium;
                    if (activeTab === 2) return user.isAdmin;
                    return true;
                  })
                  .map((user) => (
                    <React.Fragment key={user.id}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1">
                                {user.displayName || 'No Name'}
                              </Typography>
                              {user.isPremium && (
                                <Star color="primary" sx={{ ml: 1 }} fontSize="small" />
                              )}
                              {user.isAdmin && (
                                <SupervisorAccount color="secondary" sx={{ ml: 1 }} fontSize="small" />
                              )}
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" component="span">
                                {user.email}
                              </Typography>
                              <br />
                              <Typography variant="caption" color="text.secondary">
                                Joined: {user.createdAt}
                                {user.isPremium && user.subscription?.current_period_end && (
                                  <> • Premium until: {new Date(user.subscription.current_period_end).toLocaleDateString()}</>
                                )}
                              </Typography>
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={user.isPremium || false}
                                onChange={() => togglePremiumStatus(user.id, user.isPremium)}
                                color="primary"
                              />
                            }
                            label="Premium"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={user.isAdmin || false}
                                onChange={() => toggleAdminStatus(user.id, user.isAdmin)}
                                color="secondary"
                              />
                            }
                            label="Admin"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                {filteredUsers.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary="No users found"
                      secondary={searchQuery ? "Try a different search term" : "No users in this category"}
                    />
                  </ListItem>
                )}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Remove Admin Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Remove Admin Privileges</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove admin privileges from this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleConfirmAdminChange(false)} color="error">
            Remove Admin
          </Button>
        </DialogActions>
      </Dialog>

      {/* Grant Admin Confirmation Dialog */}
      <Dialog
        open={grantAdminDialogOpen}
        onClose={() => setGrantAdminDialogOpen(false)}
      >
        <DialogTitle>Grant Admin Privileges</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to grant admin privileges to this user? 
            This will give them full access to the admin dashboard and user management.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGrantAdminDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleConfirmAdminChange(true)} color="primary">
            Grant Admin
          </Button>
        </DialogActions>
      </Dialog>

      {/* Grant Premium Dialog */}
      <Dialog
        open={grantPremiumDialogOpen}
        onClose={() => setGrantPremiumDialogOpen(false)}
      >
        <DialogTitle>Grant Premium Access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the duration for premium access:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Duration (months)"
            type="number"
            fullWidth
            variant="outlined"
            value={premiumDuration}
            onChange={(e) => setPremiumDuration(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGrantPremiumDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleGrantPremium} color="primary">
            Grant Premium
          </Button>
        </DialogActions>
      </Dialog>

      {/* Grant Premium by Email Dialog */}
      <Dialog
        open={grantPremiumByEmailDialogOpen}
        onClose={() => setGrantPremiumByEmailDialogOpen(false)}
      >
        <DialogTitle>Grant Premium Access by Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the email address of the user you want to grant premium access to:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={premiumEmail}
            onChange={(e) => setPremiumEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Duration (months)"
            type="number"
            fullWidth
            variant="outlined"
            value={premiumDuration}
            onChange={(e) => setPremiumDuration(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGrantPremiumByEmailDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={async () => {
              if (!premiumEmail) return;
              
              try {
                const result = await grantPremiumByEmail(premiumEmail, premiumDuration);
                setNotification({
                  open: true,
                  message: result.message,
                  severity: result.success ? 'success' : 'error',
                });
                if (result.success) {
                  setPremiumEmail('');
                  setGrantPremiumByEmailDialogOpen(false);
                  fetchUsers(); // Refresh user list
                }
              } catch (error) {
                console.error('Error granting premium access:', error);
                setNotification({
                  open: true,
                  message: 'Failed to grant premium access',
                  severity: 'error',
                });
              }
            }} 
            color="primary"
            disabled={!premiumEmail}
          >
            Grant Premium
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity} onClose={() => setNotification({ ...notification, open: false })}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard;