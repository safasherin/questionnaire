import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Announcements from '../components/Announcements';
import Navbar from '../components/Navbar';

export default function AnnouncementsPage() {
    const [ants, setAnts] = useState([])
    useEffect(() => {
        const fetchAnts = async () => {
            const res = await axios.get("/announcement")
            setAnts(res.data)
            // console.log(res)
        }
        fetchAnts()
    }, [])

    return <div>
        <Navbar />
        <Announcements announcements={ants} />
    </div>;
}
