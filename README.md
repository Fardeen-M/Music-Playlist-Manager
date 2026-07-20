🎵 Music Playlist Manager

A Java-based Music Playlist Manager that uses a Circular Doubly Linked List to efficiently manage songs. The application supports adding, deleting, searching, displaying, and navigating through songs using next and previous operations in a continuous loop.


📌 Project Information

| Field | Detail |
|-------|--------|
| Register Number | 711524BEE016 |
| Student Name | Fardeen M |
| Project Title | Music Playlist Manager |
| Domain | Data Structures using Circular Doubly Linked List |
| Language | JavaScript |
| Core Concepts | Circular Doubly Linked List, Object-Oriented Programming (OOP), Java Collections Framework |



📖 Overview

The Music Playlist Manager is a JavaScript application that manages a collection of songs using a Circular Doubly Linked List. It allows users to add songs, delete songs, search for songs, display the playlist, and navigate through songs in both forward and backward directions.

This project demonstrates the implementation of Data Structures and Object-Oriented Programming (OOP) concepts in Java.


🎯 Objectives

- Add songs to the playlist.
- Delete songs from the playlist.
- Search for songs by title.
- Display all songs.
- Play next song.
- Play previous song.
- Count total songs.
- Demonstrate Circular Doubly Linked List implementation.


🏗️ System Design


            Song
              │
              ▼
            Node
              │
              ▼
CircularDoublyLinkedList
              │
              ▼
      MainApplication

 
📚 Class Responsibilities

Song

Stores song details.

Attributes

- title
- artist
- duration

 Methods

- getTitle()
- getArtist()
- getDuration()
- toString()

Node

Represents a node in the Circular Doubly Linked List.

Attributes

- Song song
- Node next
- Node prev


CircularDoublyLinkedList

Handles playlist operations.

Functions

- addSong()
- deleteSong()
- searchSong()
- displayPlaylist()
- playNext()
- playPrevious()
- countSongs()


MainApplication

Provides the menu-driven interface for the user.


⚙️ Algorithm

Add Song

1. Read song details.
2. Create a Song object.
3. Create a Node.
4. Insert into the Circular Doubly Linked List.
5. Display success message.

Time Complexity: O(1)


Delete Song

1. Read song title.
2. Search for the song.
3. Remove the node.
4. Update previous and next links.

Time Complexity: O(n)


Search Song

1. Read song title.
2. Traverse the Circular Doubly Linked List.
3. Display song if found.

Time Complexity: O(n)



Display Playlist

Traverse the Circular Doubly Linked List and display all songs.

Time Complexity: O(n)



Play Next Song

Move to the next node.

Time Complexity: O(1)


Play Previous Song

Move to the previous node.

Time Complexity: O(1)


🧠 Data Structure Used

Circular Doubly Linked List

Purpose

- Store playlist songs
- Efficient next and previous navigation
- Continuous playlist looping

Operations

| Operation | Complexity |
|-----------|------------|
| Insert | O(1) |
| Delete | O(n) |
| Search | O(n) |
| Next Song | O(1) |
| Previous Song | O(1) |


💻 Technologies Used

- JavaScript
- VS Code
- Html
- Css
- Java Collections Framework
- Object-Oriented Programming (OOP)


🚀 Build and Run

Compile

bash
javac .java


Run

bash
java MainApplication


📂 Project Structure

MUSIC-PLAYLIST-MANAGER/
├── .vscode/
│   └── launch.json
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── CircularDoublyLinkedList.js
├── index.html
└── README.md

🏆 Features

- Add Song
- Delete Song
- Search Song
- Display Playlist
- Play Next Song
- Play Previous Song
- Count Songs
- Circular Doubly Linked List Implementation


📈 Future Enhancements

- Java Swing GUI
- Music File Support
- Database Integration (MySQL)
- User Login
- Playlist Categories
- Shuffle Playlist
- Repeat Mode
- Favorites Playlist

🧠 Key Concepts Demonstrated

- Circular Doubly Linked List
- Object-Oriented Programming
- Encapsulation
- Abstraction
- Java Collections
- Menu-Driven Programming
- Data Structures


🙋 Author

Fardeen M

Register Number: 711524BEE016

Department: B.E. Electrical and Electronics Engineering (EEE)

College: KIT – Kalaignarkarunanidhi Institute of Technology


📄 License

This project was developed as part of the **Data Structures Mini Project** coursework. It demonstrates the implementation of a Circular Doubly Linked List using Java Object-Oriented Programming principles to build an efficient Music Playlist Manager.
