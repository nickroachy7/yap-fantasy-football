import express from 'express';
import axios from 'axios';

const router = express.Router();

// Test BallDontLie API connection
router.get('/test-nfl', async (req, res) => {
  try {
    const apiKey = process.env.BALLDONTLIE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'BallDontLie API key not configured'
      });
    }

    // Fetch NFL players from BallDontLie API
    const response = await axios.get('https://api.balldontlie.io/v1/players', {
      headers: {
        'Authorization': apiKey
      },
      params: {
        per_page: 10,
        page: 1
      }
    });

    const players = response.data.data.map((player: any) => ({
      id: player.id,
      firstName: player.first_name,
      lastName: player.last_name,
      position: player.position,
      team: player.team?.full_name || 'Free Agent',
      teamAbbreviation: player.team?.abbreviation || 'FA'
    }));

    res.json({
      success: true,
      message: 'BallDontLie API connection successful!',
      players: players,
      totalFetched: players.length,
      subscription: 'NFL GOAT (Unlimited calls!)'
    });

  } catch (error: any) {
    console.error('BallDontLie API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch NFL data',
      details: error.response?.data || error.message
    });
  }
});

export default router;
