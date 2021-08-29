import type {GetServerSideProps, NextPage} from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getSession, signIn, signOut, useSession} from "next-auth/client";
import {Context} from "react";
// import {UserContext} from "../context/user-context";

type Props = {
    session: string
}

const Home: NextPage<Props> = (props) => {
    const [session, loading] = useSession()
    console.log('session: ', props.session)
    console.log('loading: ', loading)
    console.log('session: ', session)
  return (
        <div className={styles.container}>

          <footer className={styles.footer}>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              Powered by{' '}
              <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
            </a>
                  {!session && <>Welcome Guest | <button className="btn-link" onClick={() => signIn()}>Login</button></>}
                  {session && <>Welcome | <span className="btn-link" onClick={()=>signOut()}>Logout</span></>}
              {/*<UserContext.Consumer>{({user, login, logout})=><>*/}

              {/*</>}*/}

              {/*</UserContext.Consumer>*/}
          </footer>
        </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    return {
        props: {
            session
        }
    }
}

export default Home
