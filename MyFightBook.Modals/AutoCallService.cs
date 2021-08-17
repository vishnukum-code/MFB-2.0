using System;
using System.Collections.Generic;

namespace MyFightBook.Modals
{
    public class Variables
    {
        private static int clubcount;
        public static int Clubcount
        {
            get { return clubcount; }
            set { clubcount = value; }
        }
        private static int fightercount;
        public static int Fightercount
        {
            get { return fightercount; }
            set { fightercount = value; }
        }
        private static int eventcount;
        public static int Eventcount
        {
            get { return eventcount; }
            set { eventcount = value; }
        }
        private static List<EventTournamentType> eventtournamentlist = null;
        public static List<EventTournamentType> EventTournamentList
        {
            get { return eventtournamentlist; }
            set { eventtournamentlist = value; }
        }
        private static List<RandomUsers> userlist = null;
        public static List<RandomUsers> UserList
        {
            get { return userlist; }
            set { userlist = value; }
        }
    }
    public class EventTournamentType
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public DateTime? StartDate { get; set; }
        public string Image { get; set; }
        public string[] ImageArray { get; set; }
        public int Id { get; set; }
    }
    public class RandomUsers
    {
        public string Fullname { get; set; }
        public string Sportsname { get; set; }
        public int UserId { get; set; }
        public string ProfileImage { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        public string FederationsSports { get; set; }
    }
}
