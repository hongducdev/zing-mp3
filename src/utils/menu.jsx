import icons from "./icons";

const { MdOutlineLibraryMusic, MdOutlineFeed, TbChartArcs, HiOutlineChartPie } =
  icons;
export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icons: <MdOutlineLibraryMusic size={24} />,
  },
  {
    path: "",
    text: "Khám phá",
    end: true,
    icons: <TbChartArcs size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icons: <HiOutlineChartPie size={24} />,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icons: <MdOutlineFeed size={24} />,
  },
];

export const searchMenu = [
  {
    path: "tat-ca",
    text: "Tất cả",
  },
  {
    path: "bai-hat",
    text: "Bài hát",
  },
  {
    path: "playlist",
    text: "Playlist/ablum",
  },
  {
    path: "artist",
    text: "Nghệ sĩ/OA",
  }
]
