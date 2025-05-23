import React, { useEffect, useState } from 'react';
import './Profile.css';
import { FaUserCircle, FaEdit, FaChartLine, FaBox, FaCog } from 'react-icons/fa';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        company: 'Unknown Inc.',
        role: 'User',
        stats: { forecasts: 0, optimizations: 0, activeSKUs: 0 }
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
        const parsed = JSON.parse(user);
        setUserData((prev) => ({
            ...prev,
            name: parsed.name,
            email: parsed.email,
        }));
        }
    }, []);

    return (
        <div className="profile-container">
        <div className="profile-header">
            <h1 className="profile-title">
            <FaUserCircle className="profile-icon" />
            User Profile
            </h1>
            <button className="edit-button">
            <FaEdit /> Edit Profile
            </button>
        </div>

        <div className="profile-content">
            <div className="profile-card">
            <div className="profile-info">
                <div className="profile-avatar">
                <FaUserCircle size={80} />
                </div>
                <div className="profile-details">
                <h2>{userData.name}</h2>
                <p className="profile-email">{userData.email}</p>
                <p className="profile-company">{userData.company}</p>
                <p className="profile-role">{userData.role}</p>
                </div>
            </div>

            <div className="profile-stats">
                <div className="stat-card">
                <FaChartLine className="stat-icon" />
                <div>
                    <span className="stat-number">{userData.stats.forecasts}</span>
                    <span className="stat-text">Forecasts</span>
                </div>
                </div>
                <div className="stat-card">
                <FaBox className="stat-icon" />
                <div>
                    <span className="stat-number">{userData.stats.optimizations}</span>
                    <span className="stat-text">Optimizations</span>
                </div>
                </div>
                <div className="stat-card">
                <FaCog className="stat-icon" />
                <div>
                    <span className="stat-number">{userData.stats.activeSKUs}</span>
                    <span className="stat-text">Active SKUs</span>
                </div>
                </div>
            </div>
            </div>

            <div className="profile-actions">
            <button className="action-button primary">View Dashboard</button>
            <button className="action-button secondary">Account Settings</button>
            <button className="action-button warning">Reset Password</button>
            </div>
        </div>
        </div>
    );
};

export default Profile;
