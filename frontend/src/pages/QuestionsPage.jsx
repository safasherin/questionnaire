import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import Questions from '../components/Questions';

export default function QuestionsPage() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const resposts = await axios.get("/post/");
            setPosts(resposts.data)
        }

        fetchPosts()
        // console.log(user)
    }, [])

    return <div>
        <NavBar />
        <Questions posts={posts} />

    </div>;
}
