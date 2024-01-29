// leaderboard.component.ts

import { Component, OnInit } from '@angular/core';

interface Player {
  name: string;
  wins: number;
  losses: number;
  champion: number;
  winLossRatio: number;
  season: number;
}

import { playersData } from '../../assets/player-data.json';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  players: Player[] = [];
  selectedFilter: string = ''; // Add this property
  filteredPlayers: Player[] = [];
  displayedColumns: string[] = ['name', 'wins', 'losses', 'winRate'];

  champions: Player[] = [];

  ngOnInit(): void {
    console.log('LeaderboardComponent - ngOnInit: Start loading playersData...');
    console.log('LeaderboardComponent - ngOnInit: playersData:', playersData);
    this.selectedFilter = 'winRate';
  
    // Calculate win/loss ratio and update players array
    this.players = playersData.map(player => ({
      ...player,
      winLossRatio: this.calculateWinLossRatio(player.wins, player.losses)
    }));
    //default to winrate on load
    this.players = this.players.slice().sort((a, b) => b.winLossRatio - a.winLossRatio);

    this.filteredPlayers = this.players;

    // Filter players with champions count greater than 0
    this.champions = this.players.filter(player => player.champion > 0);

    console.log('LeaderboardComponent - ngOnInit: Players loaded:', this.players);
    console.log('LeaderboardComponent - ngOnInit: Champions loaded:', this.champions);
  }

  applyFilter(): void {
    console.log('LeaderboardComponent - applyFilter: Applying filter:', this.selectedFilter);

    if (this.selectedFilter === 'winRate') {
      this.filteredPlayers = this.players.slice().sort((a, b) => b.winLossRatio - a.winLossRatio);
    }

    if (this.selectedFilter === 'mostWins') {
      this.filteredPlayers = this.players.slice().sort((a, b) => b.wins - a.wins);
    }

    console.log('LeaderboardComponent - applyFilter: Filtered Players:', this.filteredPlayers);
  }

  // Function to calculate win/loss ratio
  calculateWinLossRatio(wins: number, losses: number): number {
    const totalMatches = wins + losses;
    return totalMatches === 0 ? 0 : (wins / totalMatches);
  }
}
