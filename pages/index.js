import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect } from "react";
import Loading from "../components/Loading";
import CollectionDetails from "../components/CollectionDetails";
import sort from "../utils/sorting";

export default function Home() {
  const [donate, setDonate] = useState(false);
  const [popularArtists, setPopularArtists] = useState(false);
  const [collections, setCollections] = useState([]);
  const [sortedCollections, setSortedCollections] = useState([]);
  const [direction, setDirection] = useState(false); //false for 'descending', true for 'ascending'
  const [loading, setLoading] = useState(false);
  const [showCriteriaMenu, setShowCriteriaMenu] = useState(false);
  const [displayCollectionInformation, setDisplayCollectionInformation] =
    useState(false);

  const [artist, setArtist] = useState({
    wallet: null,
    name: null,
  });

  const criteriaList = [
    {
      key: "floor_price",
      name: "Price",
      path: "M19 16.166c0-4.289-4.465-5.483-7.887-7.091-2.079-1.079-1.816-3.658 1.162-3.832 1.652-.1 3.351.39 4.886.929l.724-3.295c-1.814-.551-3.437-.803-4.885-.841v-2.036h-2v2.134c-3.89.535-5.968 2.975-5.968 5.7 0 4.876 5.693 5.62 7.556 6.487 2.54 1.136 2.07 3.5-.229 4.021-1.993.451-4.538-.337-6.45-1.079l-.909 3.288c1.787.923 3.931 1.417 6 1.453v1.996h2v-2.105c3.313-.464 6.005-2.293 6-5.729z",
    },
    {
      key: "num_owners",
      name: "Owners",
      path: "M23.995 24h-1.995c0-3.104.119-3.55-1.761-3.986-2.877-.664-5.594-1.291-6.584-3.458-.361-.791-.601-2.095.31-3.814 2.042-3.857 2.554-7.165 1.403-9.076-1.341-2.229-5.413-2.241-6.766.034-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 4.983 0 8.451 4.766 3.732 13.678-1.551 2.928 1.65 3.624 5.09 4.418 2.979.688 3.178 2.143 3.178 4.663l-.005 1.241zm-13.478-6l.91 2h1.164l.92-2h-2.994zm2.995 6l-.704-3h-1.615l-.704 3h3.023z",
    },
    {
      key: "market_cap",
      name: "Market Cap",
      path: "M6.109 21.289c1.703 1.083 3.724 1.711 5.891 1.711 2.166 0 4.187-.628 5.89-1.711l.618.792c-1.876 1.214-4.11 1.919-6.508 1.919-2.4 0-4.637-.706-6.513-1.922l.622-.789zm5.853-13.289c-3.037 0-5.5 2.462-5.5 5.5 0 3.037 2.463 5.5 5.5 5.5s5.5-2.463 5.5-5.5c0-3.038-2.463-5.5-5.5-5.5zm7.038 11h-1c0-1.104.896-2 2-2h2c.963 0 2 .76 2 2h-1c0-.619-.519-1-1-1h-2c-.552 0-1 .449-1 1zm-18 0h-1c0-1.104.896-2 2-2h2c.963 0 2 .76 2 2h-1c0-.619-.519-1-1-1h-2c-.552 0-1 .449-1 1zm11-10c2.639 0 4.5 1.861 4.5 4.5 0 2.639-1.861 4.5-4.5 4.5-2.639 0-4.5-1.861-4.5-4.5 0-2.639 1.861-4.5 4.5-4.5zm9 3c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm-18 0c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm9.25 4.5h-.5v-.499c-.518-.009-1.053-.133-1.5-.364l.227-.822c.478.186 1.114.383 1.613.27.574-.13.692-.721.057-1.005-.466-.217-1.889-.403-1.889-1.621 0-.682.519-1.292 1.492-1.425v-.534h.5v.509c.362.01.768.073 1.221.21l-.181.824c-.384-.135-.808-.257-1.221-.232-.745.043-.81.688-.291.958.856.402 1.972.7 1.972 1.772.001.859-.672 1.316-1.5 1.432v.527zm8.75-3.375c.621 0 1.125.504 1.125 1.125s-.504 1.125-1.125 1.125-1.125-.504-1.125-1.125.504-1.125 1.125-1.125zm-18 0c.621 0 1.125.504 1.125 1.125s-.504 1.125-1.125 1.125-1.125-.504-1.125-1.125.504-1.125 1.125-1.125zm-1.818-3.125h-1.016c.729-4.334 3.783-7.882 7.834-9.316v1.067c-3.496 1.367-6.123 4.471-6.818 8.249zm22.652 0h-1.016c-.695-3.778-3.322-6.882-6.818-8.249v-1.067c4.051 1.434 7.105 4.982 7.834 9.316zm-13.834-3h-1c0-1.104.896-2 2-2h2c.963 0 2 .76 2 2h-1c0-.619-.519-1-1-1h-2c-.552 0-1 .449-1 1zm2-7c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0 1.125c.621 0 1.125.504 1.125 1.125s-.504 1.125-1.125 1.125-1.125-.504-1.125-1.125.504-1.125 1.125-1.125z",
    },
    {
      key: "created_date",
      name: "Date",
      path: "M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z",
    },
  ];

  const [criteria, setCriteria] = useState(criteriaList[0]);

  const artistInputRef = useRef();

  const popularArtistsArray = [
    {
      wallet: "0xce90a7949bb78892f159f428d0dc23a8e3584d75",
      name: "Snoop Dogg",
    },
    {
      wallet: "0xc6b0562605d35ee710138402b878ffe6f2e23807",
      name: "Beeple",
    },
    {
      wallet: "0xd6a984153acb6c9e2d788f08c2465a1358bb89a7",
      name: "Gary Vee",
    },
    {
      wallet: "0x293ed38530005620e4b28600f196a97e1125daac",
      name: "Mark Cuban",
    },

    {
      wallet: "0x2866ee1686fe8cde6987ba1add539c341d89617d",
      name: "Jay-Z",
    },
    {
      wallet: "0x2ce780d7c743a57791b835a9d6f998b15bbba5a4",
      name: "Pak",
    },
    {
      wallet: "0xf0d6999725115e3ead3d927eb3329d63afaec09b",
      name: "Gmoney",
    },
    {
      wallet: "0xd2aff66959ee0e6f92ee02d741071ddb5084bebb",
      name: "3LAU",
    },
    {
      wallet: "0x5338035c008ea8c4b850052bc8dad6a33dc2206c",
      name: "New Collector",
    },
    {
      wallet: "0xc5f59709974262c4afacc5386287820bdbc7eb3a",
      name: "Farokh",
    },
    {
      wallet: "0xfe5573c66273313034f7ff6050c54b5402553716",
      name: "Cole",
    },
    {
      wallet: "0xae4d837caa0c53579f8a156633355df5058b02f3",
      name: "Alex Becker",
    },
    {
      wallet: "0xfd22004806a6846ea67ad883356be810f0428793",
      name: "punk6529",
    },
    {
      wallet: "0xa2b4bdb2a800cdfec9fe4bc600bdbd3ec2d81485",
      name: "RealMissNFT",
    },
    {
      wallet: "0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459",
      name: "Pranksy",
    },
    {
      wallet: "0x3686a4b272c646ef6fbe34377337d95db7356e63",
      name: "Hiten Shah",
    },
    {
      wallet: "0x19eb7ffdcd670ca917110bd032463120a5e58c8e",
      name: "Pplpleasr",
    },
    {
      wallet: "0xb32b4350c25141e779d392c1dbe857b62b60b4c9",
      name: "flur",
    },
    {
      wallet: "0x1b523dc90a79cf5ee5d095825e586e33780f7188",
      name: "JRNY Crypto",
    },
    {
      wallet: "0x3e25dac1092031116e2a7d59953dcec2824a6c6a",
      name: "Andrew Wang",
    },
    {
      wallet: "0xff0bd4aa3496739d5667adc10e2b843dfab5712b",
      name: "Logan Paul",
    },
    {
      wallet: "0x7d4823262bd2c6e4fa78872f2587dda2a65828ed",
      name: "Faze Banks",
    },
    {
      wallet: "0x225558706370bef1760c52e76a07be9c104c98aa",
      name: "JJ Lin",
    },
  ];

  const [filteredArtists, setFilteredArtists] = useState([
    ...popularArtistsArray,
  ]);

  const handleInputChange = (e) => {
    const filteredList = popularArtistsArray.filter((artist) =>
      artist.name.toLocaleLowerCase().startsWith(e.target.value)
    );
    setFilteredArtists(filteredList);
  };

  useEffect(() => {
    if (artist.name) {
      artistInputRef.current.value = artist.name;
    }
  }, [artist]);

  // handle list filtering by order (floor_price, num_owners, created_date and market_cap)
  useEffect(() => {
    const sorted = sort(
      collections,
      direction ? "ascending" : "descending",
      criteria.key
    );

    setSortedCollections([...sorted]);
  }, [criteria, direction, collections]);

  const showPopularArtists = () => {
    setPopularArtists(!popularArtists);
  };

  const expand = () => {
    setPopularArtists(true);
  };

  const fetchWalletAssets = () => {
    if (artist.wallet) {
      setLoading(true);
      fetch(
        "https://api.opensea.io/api/v1/collections?offset=0&limit=20&asset_owner=" +
          artist.wallet
      )
        .then((response) => response.json())
        .then((response) => {
          setCollections(response);
          console.log(response);
          setTimeout(() => {
            setLoading(false);
          }, 300);
        })
        .catch((err) => console.error(err));
    }
  };

  const toggleDonationMenu = () => {
    setDonate(!donate);
  };

  const changeSortingDirection = () => {
    if (direction) setDirection(false);
    else setDirection(true);

    console.log("change sorting direction");
  };

  const handleArtistChange = (artist) => {
    setArtist({
      wallet: artist.wallet,
      name: artist.name,
    });
    setPopularArtists(false);
  };

  const toggleCriteriaMenu = () => {
    setShowCriteriaMenu(!showCriteriaMenu);
  };

  const handleCriteriaChange = (criteria) => {
    setCriteria(criteria);
    setShowCriteriaMenu(false);
  };

  // display info about a specific collection in the app without redirecting to opensea collection official page
  const showDataInSamePage = (collection) => {
    console.log(collection);
    setDisplayCollectionInformation(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Master</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.input}>
            <input
              placeholder="Search NTF Influencers"
              ref={artistInputRef}
              onClick={expand}
              onChange={handleInputChange}
            />
            {popularArtists ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#e1e1e1"
                onClick={showPopularArtists}
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#e1e1e1"
                onClick={showPopularArtists}
              >
                <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
              </svg>
            )}
            <div className={styles.popularArtistsListWrapper}>
              {popularArtists && (
                <div className={styles.popularArtistsList}>
                  {filteredArtists.map((artist, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.artist}
                        onClick={() => handleArtistChange(artist)}
                      >
                        {artist.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className={styles.searchFilterBtns}>
            <div className={styles.criteria}>
              <div className={styles.openDropdown} onClick={toggleCriteriaMenu}>
                <p> {criteria.name} </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  style={{
                    marginLeft: "10px",
                    transition: "all .3s ease",
                  }}
                >
                  <path d={criteria.path} />
                </svg>
              </div>

              {showCriteriaMenu && (
                <div className={styles.dropdown}>
                  {criteriaList.map((item) => {
                    return (
                      <div
                        key={item.name}
                        className={styles.listItem}
                        onClick={() => handleCriteriaChange(item)}
                      >
                        <p> {item.name} </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          style={{
                            marginLeft: "10px",
                            transition: "all .3s ease",
                          }}
                        >
                          <path d={item.path} />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className={styles.filter} onClick={changeSortingDirection}>
              <p> {direction ? "Ascending" : "Descending"} </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                style={{
                  margin: "0px 10px",
                  transform: direction ? "rotate(-90deg)" : "rotate(90deg)",
                  transition: "all .3s ease",
                }}
              >
                <path d="M6 0l12 12-12 12z" />
              </svg>
            </div>

            <div className={styles.search} onClick={fetchWalletAssets}>
              <p>Search NTFs</p>
            </div>
          </div>

          <div className={styles.searchMobile} onClick={fetchWalletAssets}>
            <p>Search NTFs</p>
          </div>

          {loading && <Loading />}
          <div className={styles.results}>
            {!loading &&
              sortedCollections.length > 0 &&
              sortedCollections.map((collection) => {
                return (
                  <div key={collection.name} className={styles.result}>
                    <div className={styles.resultTop}>
                      <div className={styles.title}>{collection.name}</div>
                      <div className={styles.actions}>
                        {/* <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          fill="#e1e1e1"
                          style={{ marginRight: "15px", cursor: "pointer" }}
                          onClick={() => showDataInSamePage(collection)}
                        >
                          <path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z" />
                        </svg> */}
                        <a
                          href={`https://opensea.io/collection/${collection.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#e1e1e1"
                          >
                            <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div className={styles.description}>
                      Floor Price: {collection.stats.floor_price}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.image}>
            <img src="/nfts.png"></img>
          </div>

          <div className={styles.flex}>
            <div className={styles.support} onClick={toggleDonationMenu}>
              Support Creator
            </div>
            <div className={styles.suggest}>Suggest Influencers</div>
          </div>
          <div className={styles.heading}>
            See What Influencers are holding in their wallets 😎
          </div>
          <div className={styles.tip} onClick={toggleDonationMenu}>
            <img src="/ethereum-gold.svg" />
            <p>
              Send me a tip for creating this page <span>❤️</span>
            </p>
          </div>
        </div>

        {/* <div
          className={
            displayCollectionInformation ? styles.overlay : styles.overlayHidden
          }
        >
          <CollectionDetails />
        </div>
 */}

        <div className={donate ? styles.overlay : styles.overlayHidden}>
          <div className={styles.innerOverlay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#e1e1e1"
              className={styles.closeMenu}
              onClick={toggleDonationMenu}
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
            <p className={styles.yellow}>Wallet Address:</p>
            <p className={styles.walletAddress}>
              0x85c550F57aC72F8ddcbf638dFfD4a60d610B4814
            </p>
            <p className={styles.alternativeDonationTitle}>OR</p>
            <div className={styles.donateBtn}>
              {/* <input className={styles.selectPrice} placeholder="Enter ETH" /> */}
              <select
                name="selectPrice"
                id="selectPrice"
                className={styles.selectPrice}
              >
                <option value="0.01">0.01 ETH</option>
                <option value="0.02">0.02 ETH</option>
                <option value="0.05">0.05 ETH</option>
                <option value="0.1">0.1 ETH</option>
                <option value="0.5">0.5 ETH</option>
                <option value="1">1 ETH</option>
              </select>
              <div className={styles.btn}>CONNECT WALLET</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
