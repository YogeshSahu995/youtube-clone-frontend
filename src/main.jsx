import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Login, 
  Register, 
  Channel, 
  AnotherChannel, 
  HomePage, 
  AddVideo, 
  CreatePost, 
  CreatePlaylist, 
  ViewFullPlaylist, 
  EditPlaylist,
  SubscriptionPage,
  ChangePasswordPage,
  PlayVideoPage,
  EditVideoPage,
  EditPostPage,
  YouFeedPage,
  DashboardPage
} from './pages/index.js'
import { 
  ChannelVideos, 
  ChannelPost, 
  ChannelSearchVideos, 
  ChannelPlaylists, 
  SubscribedChannels,
} from './components/index.js';
import {Layout, AuthLayout} from './layouts/index.js'
import App from './App.jsx';
import { CustomizePage } from './pages/CustomizePage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Main app logic (e.g., user authentication)
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <AuthLayout children={<HomePage />} authentication />
          },
          {
            path:'/:username',
            element: <AuthLayout children={<AnotherChannel  />} authentication />,
            children: [
              {
                path: "/:username/videos",
                element: <ChannelVideos />
              },
              {
                path: "/:username/posts",
                element: <ChannelPost />
              },
              {
                path: "/:username/search",
                element: <ChannelSearchVideos />
              },
              {
                path: "/:username/playlists",
                element: <ChannelPlaylists />
              },
              {
                path: "/:username/subscribed",
                element: <SubscribedChannels />
              }
            ]
          },
          { 
            path: '/channel/:username', 
            element:  <AuthLayout children={<Channel />} authentication />,
            children: [
              {
                path: "/channel/:username/videos",
                element: <ChannelVideos />
              },
              {
                path: "/channel/:username/posts",
                element: <ChannelPost />
              },
              {
                path: "/channel/:username/search",
                element: <ChannelSearchVideos />
              },
              {
                path: "/channel/:username/playlists",
                element: <ChannelPlaylists />
              },
              {
                path: "/channel/:username/subscribed",
                element: <SubscribedChannels />
              }
            ]
          },
          {
            path: "/feed/you",
            element: <AuthLayout children={<YouFeedPage />} authentication />
          },
          {
            path: '/edit/post/:postId',
            element: <AuthLayout children={<EditPostPage />} authentication />
          },
          {
            path: '/edit/video/:videoId',
            element: <AuthLayout children={<EditVideoPage />} authentication />
          },
          {
            path: '/edit/channel/:channelId',
            element: <AuthLayout children={<CustomizePage />} authentication />
          },
          {
            path: '/edit/Change-Password',
            element: <AuthLayout children={<ChangePasswordPage />} authentication />
          },
          {
            path: '/add-video',
            element: <AuthLayout children={<AddVideo />} authentication />
          },
          {
            path: '/video/:videoId/:userId',
            element: <AuthLayout children={<PlayVideoPage />} authentication />
          },
          {
            path: '/create-post',
            element: <AuthLayout children={<CreatePost />} authentication />
          },
          {
            path: '/create-playlist',
            element: <AuthLayout children={<CreatePlaylist />} authentication />
          },
          {
            path: `/playlist/:playlistId`,
            element: <AuthLayout children={<ViewFullPlaylist />} authentication />
          },
          {
            path: '/playlist/edit/:playlistId',
            element: <AuthLayout children={<EditPlaylist />} authentication />
          },
          {
            path: '/dashboard',
            element: <AuthLayout children={<DashboardPage />} authentication />
          },
          {
            path: '/subscriptions',
            element: <AuthLayout children={<SubscriptionPage />} authentication />
          },
          {
            path: '/login',
            element: <AuthLayout children={<Login />} authentication ={false} />,
          },
          {
            path: '/register',
            element: <AuthLayout children={<Register />} authentication ={false} />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
