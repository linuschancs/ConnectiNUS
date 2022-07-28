import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';
import { BottomTabNavi } from './BottomTabNavi';
import ChatGroupDetails from './ChatGroupDetails';
import ChatsPage from './ChatsPage';
import EditProfilePage from './EditProfilePage';
import InnerChatsPage from './InnerChatsPage';
import JoinGroupsNUSMods from './JoinGroupsNUSMods';
import LoginDetailsPage from './LoginDetailsPage';
import LoginPage from './LoginPage';
import MyProfilePage from './MyProfilePage';
import OtherUserProfilePage from './OtherUserProfilePage';
import PasswordResetPage from './PasswordResetPage';
import SearchPage from './SearchPage';
import SettingsPage from './SettingsPage';
import SignUpPage from './SignUpPage';
import SuccessfulSignUpPage from './SuccessfulSignUpPage';


it(('renders correctly'), () => {
    renderer.create(<App />)
});

it(('renders correctly'), () => {
    renderer.create(<LoginPage />)
});

it(('renders correctly'), () => {
    renderer.create(<LoginDetailsPage />)
});

it(('renders correctly'), () => {
    renderer.create(<PasswordResetPage />)
});

it(('renders correctly'), () => {
    renderer.create(<SuccessfulSignUpPage />)
});

it(('renders correctly'), () => {
    renderer.create(<SignUpPage />)
});

it(('renders correctly'), () => {
    renderer.create(<BottomTabNavi />)
});

it(('renders correctly'), () => {
    renderer.create(<EditProfilePage />)
});

it(('renders correctly'), () => {
    renderer.create(<ChatGroupDetails />)
});

it(('renders correctly'), () => {
    renderer.create(<ChatsPage />)
});

it(('renders correctly'), () => {
    renderer.create(<InnerChatsPage />)
});

it(('renders correctly'), () => {
    renderer.create(<JoinGroupsNUSMods />)
});

it(('renders correctly'), () => {
    renderer.create(<MyProfilePage />)
});

it(('renders correctly'), () => {
    renderer.create(<OtherUserProfilePage />)
});

it(('renders correctly'), () => {
    renderer.create(<SearchPage />)
});

it(('renders correctly'), () => {
    renderer.create(<SettingsPage />)
});


