
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// Fallback avatar
const settingDP = "/images/brain.PNG";

// Fetch top 10 users with profile pictures, sorted by highest balance
export const fetchTopUsers = async () => {
    try {
        const snapshot = await getDocs(collection(db, "geeks"));

        const users = await Promise.all(
            snapshot.docs.map(async (userDoc) => {
                const data = userDoc.data();

                // Fetch full user doc to access transactions
                const fullDoc = await getDoc(doc(db, "geeks", userDoc.id));
                const userData = fullDoc.data() || {};
                const transactions = userData.transactions || [];

                // Calculate balance
                const totalCredits = transactions
                    .filter((t) => t.type === "credit")
                    .reduce((acc, t) => acc + t.amount, 0);
                const totalDebits = transactions
                    .filter((t) => t.type === "debit")
                    .reduce((acc, t) => acc + t.amount, 0);

                const balance = totalCredits - totalDebits;

                return {
                    id: userDoc.id,
                    name: data.fullName || "",
                    avatar: data.profilePictureUrl || settingDP,
                    role: data.role || "Regular",
                    rank: data.rank || "Rookie",
                    username: data.username || "",
                    hasProfilePicture: !!data.profilePictureUrl,
                    balance: balance || 0,
                };
            })
        );

        // Filter users with valid name + profile pic, excluding sarcasticgeek4u
        const filtered = users.filter(
            (user) =>
                user.name.trim() !== "" &&
                user.avatar !== settingDP &&
                user.username !== "sarcasticgeek4u"
        );

        // Sort by highest balance and take top 10
        const topUsers = filtered
            .sort((a, b) => b.balance - a.balance)
            .slice(0, 10);

        return topUsers;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

// Carousel settings
export const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipe: true,
  draggable: true,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
