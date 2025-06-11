import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import BankStatement from "./pages/BankStatement"
import TabIcon from "./components/TabIcon"
import Complaints from "./pages/Complaints"
import Pay from "./pages/Pay"
import NewPay from "./pages/NewPay"
import PayReceipt from "./pages/PayReceipt"

function App() {
  return (
    <main>
      <nav className="fixed bottom-0 left-0 right-0 flex justify-center z-50 max-w[390px]">
        <div className="w-full max-w-[390px] bg-white border-t border-gray-200 flex justify-around py-2">
          <TabIcon to="/home" name="Home" />
          <TabIcon to="/bankstatement" name="Search" />
          <div className="relative -top-4">
            <TabIcon to="/pay" name="Pay" size="large" />
          </div>
          <TabIcon to="/complaints" name="Complaints" />
          <TabIcon to="/profile" name="Profile" />
        </div>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/bankStatement" element={<BankStatement />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/pay/new/:id" element={<NewPay />} />
        <Route path="/pay/new/:id/receipt" element={<PayReceipt />} />
      </Routes>
    </main>
  )
}
export default App
