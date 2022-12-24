import AppHeader from "../appHeader/AppHeader";
import ErrorBoundery from "../errorBoundary/ErrorBoundery";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const ErrorMsg = lazy(() => import('../errorMsg/ErrorMsg'));
const SinglePage = lazy(() => import("../pages/SinglePage"));
const SingleCharPage = lazy(() => import("../pages/singleCharacterLayout/SingleCharacterLayout"));
const SingleComicPage = lazy(() => import("../pages/singleComicLayout/SingleComicLayout"));

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={

                                <ErrorBoundery>
                                    <MainPage />
                                </ErrorBoundery>

                            } />

                            <Route path="/comics" element={

                                <ErrorBoundery>
                                    <ComicsPage />
                                </ErrorBoundery>
                            } />
                            <Route path="/comics/:id" element={

                                <ErrorBoundery>
                                    <SinglePage BaseComponent={SingleComicPage} dataType='comic' />
                                </ErrorBoundery>

                            } />
                            <Route path="/characters/:id" element={

                                <ErrorBoundery>
                                    <SinglePage BaseComponent={SingleCharPage} dataType='character' />
                                </ErrorBoundery>

                            } />


                            <Route path="*" element={
                                <>
                                    <h1>404 NOT FOUND</h1>
                                    <ErrorMsg />

                                </>
                            } />
                        </Routes>
                    </Suspense>

                </main>
            </div>
        </BrowserRouter>
    )

}



export default App;