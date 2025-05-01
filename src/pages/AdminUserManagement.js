import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, getDocs, doc, updateDoc, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const { currentUser, userRoles } = useAuth();

  useEffect(() => {
    if (!userRoles.isAdmin) {
      setError('Access denied. Admin privileges required.');
      setLoading(false);
      return;
    }
    fetchUsers();
  }, [userRoles.isAdmin]);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef);
      const querySnapshot = await getDocs(q);
      
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setUsers(usersData);
    } catch (error) {
      setError('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUser = async () => {
    if (!searchEmail.trim()) return;

    try {
      setLoading(true);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', searchEmail.trim()));
      const querySnapshot = await getDocs(q);

      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setUsers(usersData);
      if (usersData.length === 0) {
        setError('No user found with this email');
      } else {
        setError('');
      }
    } catch (error) {
      setError('Failed to search user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePremiumStatus = async (userId, currentStatus) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        isPremium: !currentStatus,
        updatedAt: serverTimestamp()
      });
      
      setUsers(users.map(user => {
        if (user.id === userId) {
          return { ...user, isPremium: !currentStatus };
        }
        return user;
      }));
      
      setSuccess(`Premium status updated successfully`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update premium status');
      console.error(error);
    }
  };

  const toggleAdminStatus = async (userId, currentStatus) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        isAdmin: !currentStatus
      });
      
      setUsers(users.map(user => {
        if (user.id === userId) {
          return { ...user, isAdmin: !currentStatus };
        }
        return user;
      }));
      
      setSuccess(`Admin status updated successfully`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update admin status');
      console.error(error);
    }
  };

  if (!userRoles.isAdmin) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Access denied. Admin privileges required.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>

        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <TextField
            label="Search by email"
            variant="outlined"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleSearchUser}
            disabled={loading}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchEmail('');
              fetchUsers();
            }}
            disabled={loading}
          >
            Reset
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Admin Status</TableCell>
                  <TableCell>Premium Access</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.displayName || 'N/A'}</TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={user.isAdmin || false}
                            onChange={() => toggleAdminStatus(user.id, user.isAdmin)}
                            disabled={user.id === currentUser?.uid}
                          />
                        }
                        label={user.isAdmin ? 'Admin' : 'User'}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={user.isPremium || false}
                            onChange={() => togglePremiumStatus(user.id, user.isPremium)}
                            disabled={user.id === currentUser?.uid}
                          />
                        }
                        label={user.isPremium ? 'Premium' : 'Basic'}
                      />
                    </TableCell>
                    <TableCell>
                      {user.id === currentUser?.uid && (
                        <Typography variant="body2" color="text.secondary">
                          (Current User)
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default AdminUserManagement;