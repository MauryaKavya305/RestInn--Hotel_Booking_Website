import dotenv from "dotenv";
import connectDB from "../configs/db.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

dotenv.config();

const OWNER_ID = "user_3C4szwK2zTNy0x9f5UTUC89565k";

const STANDARD_ROOM_IMAGE = "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781152313/standard_zcjxf8.png";
const DELUXE_ROOM_IMAGE = "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781152313/deluxe_lu6vrj.png";
const EXECUTIVE_SUITE_IMAGE = "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781152313/executive_ajywrn.png";

const hotels = [
  {
    name: "The Taj Mahal Palace",
    city: "Mumbai",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107019/taj-1_dydw3h.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107019/taj-2_qpv71h.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107019/taj-3_emffpe.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/taj-4_n8sehn.png"
    ]
  },
  {
    name: "Oberoi Amarvilas",
    city: "Agra",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/ob-1_moos4r.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/ob-2_dchbzq.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/ob-3_bl7z4g.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107017/ob-4_f0cnaq.png"
    ]
  },
  {
    name: "Rambagh Palace",
    city: "Jaipur",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107017/ram-1_bl3ghq.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/ram-2_cxn9rk.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/ram-3_z7ijdh.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/ram-4_xtglcw.png"
    ]
  },
  {
    name: "ITC Grand Chola",
    city: "Chennai",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107015/chola-1_sstl19.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/chola-2_hrohvb.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107015/chola-3_fmhb92.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107014/chola-4_hcbmyk.png"
    ]
  },
  {
    name: "The Leela Palace",
    city: "Udaipur",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/leela-1_cqbqmr.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/leela-2_g3idxm.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107015/leela-3_cps64k.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107014/leela-4_njwyqh.png"
    ]
  },
  {
    name: "JW Marriott",
    city: "Bangalore",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107013/jw-1_at7gpm.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107014/jw-2_fsgqda.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107014/jw-3_z3dnjg.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107013/jw-4_isxfgc.png"
    ]
  },
  {
    name: "Radisson Blu",
    city: "Goa",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111134/blu-1_sx3sub.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111132/blu-2_lxpd1u.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111133/blu-3_fvvkwt.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111133/blu-4_pl7qgp.png"
    ]
  },
  {
    name: "Park Hyatt",
    city: "Hyderabad",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111132/park-1_mzx25x.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111132/park-2_ddqpwb.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111131/park-3_r1mio6.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111132/park-4_mreb1w.png"
    ]
  },
  {
    name: "Zostel",
    city: "Manali",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146922/zos-1_yomuir.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146922/zos-2_o6hxhn.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146921/zos-3_gqknlx.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146920/zos-4_saalu8.png"
    ]
  },
  {
    name: "Evolve Back",
    city: "Coorg",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146921/evo-1_pg0hwd.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146921/evo-2_digpnh.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146920/evo-3_gau8oz.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146919/evo-4_anufmu.png"
    ]
  },
  {
    name: "Taj Falaknuma Palace",
    city: "Hyderabad",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146919/falak-1_qe30yl.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146920/falak-2_u88wj7.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146918/falak-3_f8ciej.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146918/falak-4_mvaavr.png"
    ]
  },
  {
    name: "The Leela Palace New Delhi",
    city: "New Delhi",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146918/leelaD-1_hxgmnj.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146918/leelaD-2_kvlvda.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146917/leelaD-3_nhrqvf.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146917/leelaD-4_l5wbpq.png"
    ]
  },
  {
    name: "ITC Maurya",
    city: "New Delhi",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146917/maurya-1_n6rcqi.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146916/maurya-2_v5tnec.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146916/maurya-3_ewzrvu.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146915/maurya-4_qw87iz.png"
    ]
  },
  {
    name: "The Lalit Mumbai",
    city: "Mumbai",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146915/lalit-1_jywpls.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146915/lalit-2_vzps96.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146914/lalit-3_d2veuz.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146914/lalit-4_jvhulm.png"
    ]
  },
  {
    name: "Taj Lake Palace",
    city: "Udaipur",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146914/tajlake-1_vrfdn7.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146913/tajlake-2_vfxsm9.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146913/tajlake-3_vxzs68.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146912/tajlake-4_q90m1d.png"
    ]
  },
  {
    name: "Wildflower Hall",
    city: "Shimla",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146913/wild-1_ymxmep.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146913/wild-2_uqzd6i.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146912/wild-3_v1upbs.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146911/wild-4_jugfic.png"
    ]
  },
  {
    name: "Taj Bekal Resort & Spa",
    city: "Kerala",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146910/bekal-1_h0bwxp.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146911/bekal-2_dk9kdv.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146911/bekal-3_po5dy7.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146910/bekal-4_ymaaeq.png"
    ]
  },
  {
    name: "Grand Hyatt Goa",
    city: "Goa",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146909/gg-1_boop4p.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146909/gg-2_ilm3ks.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146909/gg-3_vpgwev.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146909/gg-4_br4zwv.png"
    ]
  },
  {
    name: "Taj Coromandel",
    city: "Chennai",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146908/coro-1_rexva6.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146907/coro-2_xnru81.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146908/coro-3_i3emzu.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146907/coro-4_fpscj3.png"
    ]
  },
  {
    name: "Hyatt Regency",
    city: "New Delhi",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146908/hd-1_ldindc.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146906/hd-2_soo1em.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146906/hd-3_kfhh4t.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146906/hd-4_ubwod3.png"
    ]
  },
  {
    name: "The Park Kolkata",
    city: "Kolkata",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146905/pk-1_cu4fgk.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146905/pk-2_ej8njd.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146904/pk-3_ss5di8.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146905/pk-4_vbqm2m.png"
    ]
  },
  {
    name: "Novotel Imagica",
    city: "Khopoli",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146904/novo-1_ti76r0.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146904/novo-2_hjsk2q.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146903/novo-3_uuhwvy.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146903/novo-4_f7umhb.png"
    ]
  },
  {
    name: "Radisson Blu Plaza",
    city: "New Delhi",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146904/plaza-1_ifuzns.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146902/plaza-2_jpszzy.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146902/plaza-3_iu7feq.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146901/plaza-4_zdkdno.png"
    ]
  },
  {
    name: "Taj Bengal",
    city: "Kolkata",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146902/tb-1_rhp4pn.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146901/tb-2_qhrm50.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146900/tb-3_qhpvli.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146901/tb-4_lrbsdn.png"
    ]
  },
  {
    name: "The Oberoi Gurgaon",
    city: "Gurgaon",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146899/og-1_igvivp.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146899/og-2_e43org.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146899/og-3_pkwwdg.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146899/og-4_ukum9a.png"
    ]
  },
  {
    name: "The Westin Pune",
    city: "Pune",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146898/wes-1_geyger.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146898/wes-2_earpsf.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146899/wes-3_i6c17o.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146897/wes-4_hmomct.png"
    ]
  },
  {
    name: "Taj MG Road",
    city: "Bangalore",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146897/mg-1_j6txi7.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146897/mg-2_lkksi8.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146896/mg-3_ldd6tx.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146896/mg-4_v31r67.png"
    ]
  },
  {
    name: "The Claridges",
    city: "New Delhi",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146896/cla-1_mbiddv.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146895/cla-2_zwvsx4.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146895/cla-3_fbv7ad.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146895/cla-4_vkd1pz.png"
    ]
  },
  {
    name: "Taj Aravali Resort",
    city: "Udaipur",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146894/ara-1_qaelei.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146894/ara-2_ag2idw.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146893/ara-3_pbmqth.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146894/ara-4_t9ubuo.png"
    ]
  },
  {
    name: "The Leela Kovalam",
    city: "Kerala",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146893/kov-1_xuiayt.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146892/kov-2_ic9xrl.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146892/kov-3_qev1tu.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146892/kov-4_d7uko6.png"
    ]
  },
  {
    name: "Vivanta Dal View",
    city: "Srinagar",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146891/dal-1_trzbyi.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146891/dal-2_jusa81.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146891/dal-3_o7sxs2.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146891/dal-4_qascsp.png"
    ]
  },
  {
    name: "Mayfair Lagoon",
    city: "Bhubaneswar",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146890/lagoon-1_tylzgk.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146892/lagoon-2_geramy.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146890/lagoon-3_s5pglg.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146890/lagoon-4_avxp7h.png"
    ]
  },
  {
    name: "Taj Fisherman's Cove",
    city: "Chennai",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146889/cove-1_h2wwft.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146889/gardenia-2_fitdvv.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146889/cove-3_uzf5bz.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146888/cove-4_gug9ii.png"
    ]
  },
  {
    name: "The Oberoi Mumbai",
    city: "Mumbai",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146888/obm-1_gjz9pv.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146889/obm-2_jezdpd.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146888/obm-3_squhru.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146888/obm-4_dxzpjg.png"
    ]
  },
  {
    name: "ITC Gardenia",
    city: "Bangalore",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146887/gardenia-1_prjxvl.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146889/gardenia-2_fitdvv.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146886/gardenia-3_wf0m0o.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146886/gardenia-4_huxlpl.png"
    ]
  },
  {
    name: "Neemrana Fort Palace",
    city: "Neemrana",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146886/neem-1_komzgk.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146886/neem-2_jirrpy.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146885/neem-3_p3yb7m.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146886/neem-4_qs0sah.png"
    ]
  },
  {
    name: "The Khyber Himalayan Resort",
    city: "Gulmarg",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146885/khyber-1_iodnar.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146884/khyber-2_pdavzx.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146884/khyber-3_c8ddqe.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146883/khyber-4_fhmioy.png"
    ]
  },
  {
    name: "Taj Rishikesh Resort",
    city: "Rishikesh",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146883/rishi-1_yowues.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146884/rishi-2_izpzlp.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146883/rishi-3_ul5xim.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146883/rishi-4_m5xncr.png"
    ]
  },
  {
    name: "Fairmont Jaipur",
    city: "Jaipur",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146882/fair-1_emdb0p.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146881/fair-2_laohe0.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146882/fair-3_wii6t3.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146882/fair-4_ws03g4.png"
    ]
  },
  {
    name: "Grand Hyatt Kochi",
    city: "Kochi",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146883/kochi-1_s9yvp0.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146881/kochi-2_ncurht.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146881/kochi-3_amthsv.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781146881/kochi-4_tqj2gv.png"
    ]
  },
];

const seedData = async () => {
  try {
    await connectDB();
  // console.log(`Hotels to create: ${hotels.length}`);

    console.log("Connected to MongoDB");

    // DELETE AFTER CONNECTION
    await Room.deleteMany({});
    await Hotel.deleteMany({});

    console.log("Old data removed");

    for (const hotelData of hotels) {

      const hotel = await Hotel.create({
        ...hotelData,
        contact: "+91-9999999999",
        owner: OWNER_ID,
      });

      const basePrice = Math.floor(Math.random() * 6000) + 2500;

      await Room.create([
        {
          hotel: hotel._id,
          roomType: "Standard Room",
          pricePerNight: basePrice,
          amenities: ["WiFi", "AC", "TV"],
          images: [STANDARD_ROOM_IMAGE],
        },
        {
          hotel: hotel._id,
          roomType: "Deluxe Room",
          pricePerNight: basePrice + 3000,
          amenities: ["WiFi", "AC", "TV", "Breakfast"],
          images: [DELUXE_ROOM_IMAGE],
        },
        {
          hotel: hotel._id,
          roomType: "Executive Suite",
          pricePerNight: basePrice + 6000,
          amenities: ["WiFi", "AC", "TV", "Breakfast", "Pool", "Spa"],
          images: [EXECUTIVE_SUITE_IMAGE],
        },
      ]);

      console.log(`Created: ${hotel.name}`);
    }

    console.log("Seeding completed successfully");
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// await Room.deleteMany({});
// await Hotel.deleteMany({});

seedData();