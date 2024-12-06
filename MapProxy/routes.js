import * as dao from "./dao.js";

export default function MapProxyRoutes(app) {
    const fetchGoogleMapsData = async (req, res) => {
        try {
            const data = await dao.fetchGoogleMapsData(req.url, req.query);
            res.json(data);
        } catch (error) {
            console.error("Error in proxy:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };

    app.get("/api/maps/*", fetchGoogleMapsData);
}
