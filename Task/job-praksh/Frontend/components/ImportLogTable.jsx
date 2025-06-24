// import axios from 'axios';
// import { useEffect, useState } from 'react';

// export default function ImportLogTable() {
//   const [logs, setLogs] = useState([]);
//   console.log(logs)
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/import-logs')
//       .then(res => setLogs(res.data))
//       .catch(err => console.error('Failed to fetch logs:', err));
//   }, []);

//   return (
//     <div>
//       <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
//         <thead>
//           <tr>

//             <th>Id</th>
//             <th>ImportDateTime</th>
//             <th>Total Fetched</th>
//             <th>Total Imported</th>
//             <th>New Jobs</th>
//             <th>Updated Jobs</th>
//             <th>Failed Jobs</th>
//           </tr>
//         </thead>
//         <tbody>
//           {logs.map((log, idx) => (
//             <tr key={idx}>
//               <td>{log._id}</td>
//               <td>{new Date(log.timestamp).toLocaleString()}</td>
//               <td>{log.totalFetched}</td>
//               <td>{log.totalImported}</td>
//               <td>{log.newJobs}</td>
//               <td>{log.updatedJobs}</td>
//               <td>{log.failedJobs?.length}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function ImportLogTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/import-logs')
      .then(res => setLogs(res.data))
      .catch(err => console.error('Failed to fetch logs:', err));

    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('importLog', (newLog) => {
      setLogs(prev => [newLog, ...prev.slice(0, 19)]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="table-container">
      <h1>📊 Real-Time Import Logs</h1>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Total Fetched</th>
            <th>Total Imported</th>
            <th>New Jobs</th>
            <th>Updated</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.totalFetched}</td>
              <td>{log.totalImported}</td>
              <td className="status-new">{log.newJobs}</td>
              <td className="status-updated">{log.updatedJobs}</td>
              <td className="status-failed">{log.failedJobs?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
