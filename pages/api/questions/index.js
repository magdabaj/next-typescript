import serverData from '../../../data/questions.json'

async function handler(req,res) {
  if (req.method === 'GET') {
    res.status(200).json(serverData)
  }
}

export default handler